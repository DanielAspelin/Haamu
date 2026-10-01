#include "tcpip.hpp"

#include <algorithm>
#include <arpa/inet.h>
#include <array>
#include <cerrno>
#include <charconv>
#include <chrono>
#include <cctype>
#include <cstring>
#include <fcntl.h>
#include <fstream>
#include <ifaddrs.h>
#include <iomanip>
#include <iostream>
#include <netdb.h>
#include <poll.h>
#include <sstream>
#include <string>
#include <string_view>
#include <sys/socket.h>
#include <unistd.h>
#include <utility>

namespace {

std::string lower(std::string value)
{
    std::transform(value.begin(), value.end(), value.begin(), [](unsigned char c) {
        return static_cast<char>(std::tolower(c));
    });
    return value;
}

bool label_valid(std::string_view label) noexcept
{
    if (label.empty() || label.size() > 63 || label.front() == '-' ||
        label.back() == '-') return false;
    for (unsigned char character : label) {
        if (!std::isalnum(character) && character != '-') return false;
    }
    return true;
}

std::string endpoint_host(const NET::HOST& host)
{
    return !host.Address.Address().empty() ? host.Address.Address() : host.Name;
}

int connect_socket(const NET::CLIENT& client, int socket_type, int protocol,
                   std::string& error)
{
    error.clear();
    if (!client.Is_Valid()) { error = "invalid client endpoint"; return -1; }

    addrinfo hints {};
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = socket_type;
    hints.ai_protocol = protocol;
    addrinfo* addresses = nullptr;
    const std::string service = std::to_string(client.Remote.Service_Port.Number());
    const std::string name = endpoint_host(client.Remote);
    const int resolved = getaddrinfo(name.c_str(), service.c_str(), &hints, &addresses);
    if (resolved != 0) { error = gai_strerror(resolved); return -1; }

    int descriptor = -1;
    for (addrinfo* current = addresses; current != nullptr; current = current->ai_next) {
        descriptor = socket(current->ai_family, current->ai_socktype, current->ai_protocol);
        if (descriptor < 0) continue;

        const int flags = fcntl(descriptor, F_GETFL, 0);
        if (flags < 0 || fcntl(descriptor, F_SETFL, flags | O_NONBLOCK) < 0) {
            close(descriptor); descriptor = -1; continue;
        }

        const int connected = connect(descriptor, current->ai_addr, current->ai_addrlen);
        if (connected == 0) {
            fcntl(descriptor, F_SETFL, flags);
            break;
        }
        if (errno != EINPROGRESS) {
            close(descriptor); descriptor = -1; continue;
        }

        pollfd event { descriptor, POLLOUT, 0 };
        const int polled = poll(&event, 1, static_cast<int>(client.Timeout.count()));
        int socket_error = 0;
        socklen_t length = sizeof(socket_error);
        if (polled > 0 && getsockopt(descriptor, SOL_SOCKET, SO_ERROR,
                                    &socket_error, &length) == 0 && socket_error == 0) {
            fcntl(descriptor, F_SETFL, flags);
            break;
        }
        close(descriptor); descriptor = -1;
    }
    freeaddrinfo(addresses);
    if (descriptor < 0 && error.empty()) error = "connection failed or timed out";
    return descriptor;
}

void receive_timeout(int descriptor, std::chrono::milliseconds timeout)
{
    timeval value {};
    value.tv_sec = static_cast<time_t>(timeout.count() / 1000);
    value.tv_usec = static_cast<suseconds_t>((timeout.count() % 1000) * 1000);
    setsockopt(descriptor, SOL_SOCKET, SO_RCVTIMEO, &value, sizeof(value));
    setsockopt(descriptor, SOL_SOCKET, SO_SNDTIMEO, &value, sizeof(value));
}

bool send_all(int descriptor, std::string_view data, std::string& error)
{
    std::size_t transferred = 0;
    while (transferred < data.size()) {
#if defined(MSG_NOSIGNAL)
        const ssize_t amount = send(descriptor, data.data() + transferred,
                                    data.size() - transferred, MSG_NOSIGNAL);
#else
        const ssize_t amount = send(descriptor, data.data() + transferred,
                                    data.size() - transferred, 0);
#endif
        if (amount < 0) {
            if (errno == EINTR) continue;
            error = std::strerror(errno); return false;
        }
        if (amount == 0) { error = "connection closed while sending"; return false; }
        transferred += static_cast<std::size_t>(amount);
    }
    return true;
}

} // namespace

namespace NET {

IP::IP(std::string address) : Value(std::move(address))
{
    Validate(Value, Type);
}

bool IP::Validate(std::string_view address, FAMILY& family) noexcept
{
    std::array<unsigned char, 16> binary {};
    const std::string text(address);
    if (inet_pton(AF_INET, text.c_str(), binary.data()) == 1) {
        family = FAMILY::IPv4; return true;
    }
    if (inet_pton(AF_INET6, text.c_str(), binary.data()) == 1) {
        family = FAMILY::IPv6; return true;
    }
    family = FAMILY::Invalid; return false;
}

bool IP::Is_Valid() const noexcept { return Type != FAMILY::Invalid; }
bool IP::Is_Loopback() const noexcept
{
    if (!Is_Valid()) return false;
    if (Type == FAMILY::IPv6) return Value == "::1" || Value == "0:0:0:0:0:0:0:1";
    in_addr address {};
    inet_pton(AF_INET, Value.c_str(), &address);
    return (ntohl(address.s_addr) & 0xFF000000U) == 0x7F000000U;
}
bool IP::Is_Unspecified() const noexcept { return Value == "0.0.0.0" || Value == "::"; }
const std::string& IP::Address() const noexcept { return Value; }
IP::FAMILY IP::Family() const noexcept { return Type; }

bool PORT::Parse(std::string_view text, PORT& output) noexcept
{
    unsigned value = 0;
    const auto result = std::from_chars(text.data(), text.data() + text.size(), value);
    if (result.ec != std::errc{} || result.ptr != text.data() + text.size() ||
        value > 65535) return false;
    output = PORT(static_cast<std::uint16_t>(value)); return true;
}

HOSTNAME::HOSTNAME(std::string value) : Name(std::move(value)), Valid(Validate(Name)) {}
bool HOSTNAME::Validate(std::string_view value) noexcept
{
    return value.size() <= 63 && label_valid(value);
}
bool HOSTNAME::Is_Valid() const noexcept { return Valid; }
const std::string& HOSTNAME::Value() const noexcept { return Name; }

FQDN::FQDN(std::string value) : Name(std::move(value)), Valid(Validate(Name)) {}
bool FQDN::Validate(std::string_view value) noexcept
{
    if (!value.empty() && value.back() == '.') value.remove_suffix(1);
    if (value.empty() || value.size() > 253 || value.find('.') == std::string_view::npos) {
        return false;
    }
    while (!value.empty()) {
        const auto point = value.find('.');
        const auto label = value.substr(0, point);
        if (!label_valid(label)) return false;
        if (point == std::string_view::npos) break;
        value.remove_prefix(point + 1);
    }
    return true;
}
bool FQDN::Is_Valid() const noexcept { return Valid; }
const std::string& FQDN::Value() const noexcept { return Name; }

bool MAC::Parse(std::string_view text, MAC& output) noexcept
{
    if (text.size() != 17 || (text[2] != ':' && text[2] != '-')) return false;
    const char separator = text[2];
    MAC parsed;
    for (std::size_t index = 0; index < 6; ++index) {
        const std::size_t offset = index * 3;
        if (index != 5 && text[offset + 2] != separator) return false;
        unsigned value = 0;
        const auto result = std::from_chars(text.data() + offset,
                                            text.data() + offset + 2, value, 16);
        if (result.ec != std::errc{} || result.ptr != text.data() + offset + 2 ||
            value > 0xFF) return false;
        parsed.Bytes[index] = static_cast<std::uint8_t>(value);
    }
    parsed.Valid = true; output = parsed; return true;
}
bool MAC::Is_Valid() const noexcept { return Valid; }
bool MAC::Is_Multicast() const noexcept { return Valid && (Bytes[0] & 1U) != 0; }
bool MAC::Is_Locally_Administered() const noexcept { return Valid && (Bytes[0] & 2U) != 0; }
std::string MAC::String() const
{
    if (!Valid) return {};
    std::ostringstream stream;
    for (std::size_t index = 0; index < Bytes.size(); ++index) {
        if (index != 0) stream << ':';
        stream << std::uppercase << std::hex << std::setw(2) << std::setfill('0')
               << static_cast<unsigned>(Bytes[index]);
    }
    return stream.str();
}

bool HOST::Is_Valid() const noexcept
{
    return Address.Is_Valid() || HOSTNAME::Validate(Name) || FQDN::Validate(Name);
}
std::string HOST::Endpoint() const
{
    std::string value = endpoint_host(*this);
    if (Address.Family() == IP::FAMILY::IPv6) value = '[' + value + ']';
    if (Service_Port.Is_Valid()) value += ':' + std::to_string(Service_Port.Number());
    return value;
}

HOST LOCALHOST::IPv4() { HOST host; host.Name = "localhost"; host.Address = IP("127.0.0.1"); return host; }
HOST LOCALHOST::IPv6() { HOST host; host.Name = "localhost"; host.Address = IP("::1"); return host; }
bool LOCALHOST::Is_Local(const IP& address) noexcept { return address.Is_Loopback(); }

GLOBALHOST::GLOBALHOST(HOST host) : Host(std::move(host)) {}
bool GLOBALHOST::Is_Valid() const noexcept
{
    return Host.Is_Valid() && (!Host.Address.Is_Valid() ||
           (!Host.Address.Is_Loopback() && !Host.Address.Is_Unspecified()));
}
const HOST& GLOBALHOST::Value() const noexcept { return Host; }

GROUP::GROUP(std::string name) : Group_Name(std::move(name)) {}
bool GROUP::Add(const HOST& host)
{
    if (!host.Is_Valid()) return false;
    Group_Members.push_back(host); return true;
}
const std::string& GROUP::Name() const noexcept { return Group_Name; }
const std::vector<HOST>& GROUP::Members() const noexcept { return Group_Members; }

bool HOSTS::Insert(const HOST& host)
{
    return host.Is_Valid() && !host.Name.empty() && Entries.emplace(host.Name, host).second;
}
const HOST* HOSTS::Find(std::string_view name) const
{
    const auto found = Entries.find(std::string(name));
    return found == Entries.end() ? nullptr : &found->second;
}
std::vector<HOST> HOSTS::List() const
{
    std::vector<HOST> result;
    for (const auto& entry : Entries) result.push_back(entry.second);
    std::sort(result.begin(), result.end(), [](const HOST& a, const HOST& b) {
        return a.Name < b.Name;
    });
    return result;
}
bool HOSTS::Load_File(const std::string& path, std::string& error)
{
    std::ifstream stream(path);
    if (!stream) { error = "could not open hosts file"; return false; }
    std::string line;
    while (std::getline(stream, line)) {
        const auto comment = line.find('#');
        if (comment != std::string::npos) line.erase(comment);
        std::istringstream fields(line);
        std::string address;
        if (!(fields >> address)) continue;
        IP ip(address);
        if (!ip.Is_Valid()) continue;
        std::string name;
        while (fields >> name) { HOST host; host.Name = name; host.Address = ip; Insert(host); }
    }
    if (stream.bad()) { error = "failed while reading hosts file"; return false; }
    error.clear(); return true;
}
std::size_t HOSTS::Size() const noexcept { return Entries.size(); }

bool GATEWAY::Is_Valid() const noexcept { return Address.Is_Valid() && !Address.Is_Unspecified(); }
bool ROUTE::Is_Valid() const noexcept
{
    if (!Destination.Is_Valid() || !Via.Is_Valid()) return false;
    return Destination.Family() == IP::FAMILY::IPv4 ? Prefix <= 32 : Prefix <= 128;
}

bool MAP::Bind(std::string alias, HOST host)
{
    return !alias.empty() && host.Is_Valid() && Bindings.emplace(std::move(alias), std::move(host)).second;
}
const HOST* MAP::Resolve(std::string_view alias) const
{
    const auto found = Bindings.find(std::string(alias));
    return found == Bindings.end() ? nullptr : &found->second;
}
bool MAP::Remove(std::string_view alias) { return Bindings.erase(std::string(alias)) != 0; }
std::size_t MAP::Size() const noexcept { return Bindings.size(); }

bool ROUTER::Add(const ROUTE& route) { if (!route.Is_Valid()) return false; Table.push_back(route); return true; }
const std::vector<ROUTE>& ROUTER::Routes() const noexcept { return Table; }
const ROUTE* ROUTER::Default() const noexcept
{
    const auto found = std::find_if(Table.begin(), Table.end(), [](const ROUTE& route) {
        return route.Prefix == 0;
    });
    return found == Table.end() ? nullptr : &*found;
}

static bool rule_match(const IP& rule_address, const PORT& rule_port,
                       const std::string& rule_protocol, const IP& address,
                       const PORT& port, const std::string& protocol)
{
    const bool address_match = !rule_address.Is_Valid() ||
        (address.Is_Valid() && rule_address.Address() == address.Address());
    const bool port_match = !rule_port.Is_Valid() ||
        (port.Is_Valid() && rule_port.Number() == port.Number());
    const bool protocol_match = rule_protocol == "any" || lower(rule_protocol) == lower(protocol);
    return address_match && port_match && protocol_match;
}
bool ALLOW::Matches(const IP& address, const PORT& port, const std::string& protocol) const
{ return rule_match(Address, Service_Port, Protocol, address, port, protocol); }
bool DENY::Matches(const IP& address, const PORT& port, const std::string& protocol) const
{ return rule_match(Address, Service_Port, Protocol, address, port, protocol); }
void FIREWALL::Add(const ALLOW& rule) { Allowed.push_back(rule); }
void FIREWALL::Add(const DENY& rule) { Denied.push_back(rule); }
void FIREWALL::Default(DECISION decision) noexcept { Default_Decision = decision; }
FIREWALL::DECISION FIREWALL::Evaluate(const IP& address, const PORT& port,
                                      const std::string& protocol) const
{
    for (const auto& rule : Denied) if (rule.Matches(address, port, protocol)) return DECISION::Deny;
    for (const auto& rule : Allowed) if (rule.Matches(address, port, protocol)) return DECISION::Allow;
    return Default_Decision;
}

bool CLIENT::Is_Valid() const noexcept
{ return Remote.Is_Valid() && Remote.Service_Port.Is_Valid() && Timeout.count() > 0; }
bool SERVER::Is_Valid() const noexcept
{ return Local.Is_Valid() && Local.Service_Port.Is_Valid() && Backlog > 0; }
bool PROXY::Is_Valid() const noexcept
{ return Type == TYPE::None || (Endpoint.Is_Valid() && Endpoint.Service_Port.Is_Valid()); }
bool SEND::Succeeded() const noexcept { return Error.empty() && Transferred == Data.size(); }
bool RECEIVE::Succeeded() const noexcept { return Error.empty(); }

bool TCP::Probe(const CLIENT& client, std::string& error)
{
    const int descriptor = connect_socket(client, SOCK_STREAM, IPPROTO_TCP, error);
    if (descriptor < 0) return false;
    close(descriptor); return true;
}

bool TCP::Exchange(const CLIENT& client, std::string_view request,
                   RECEIVE& response, std::size_t maximum)
{
    response = {};
    std::string error;
    const int descriptor = connect_socket(client, SOCK_STREAM, IPPROTO_TCP, error);
    if (descriptor < 0) { response.Error = error; return false; }
    receive_timeout(descriptor, client.Timeout);
    if (!send_all(descriptor, request, error)) {
        response.Error = error; close(descriptor); return false;
    }
    shutdown(descriptor, SHUT_WR);
    std::array<unsigned char, 4096> buffer {};
    while (response.Data.size() < maximum) {
        const std::size_t wanted = std::min(buffer.size(), maximum - response.Data.size());
        const ssize_t amount = recv(descriptor, buffer.data(), wanted, 0);
        if (amount > 0) response.Data.insert(response.Data.end(), buffer.begin(), buffer.begin() + amount);
        else if (amount == 0) break;
        else if (errno == EINTR) continue;
        else if ((errno == EAGAIN || errno == EWOULDBLOCK) && !response.Data.empty()) break;
        else { response.Error = std::strerror(errno); close(descriptor); return false; }
    }
    close(descriptor); response.Transferred = response.Data.size(); return true;
}

bool UDP::Send(const CLIENT& client, std::string_view data, std::string& error)
{
    const int descriptor = connect_socket(client, SOCK_DGRAM, IPPROTO_UDP, error);
    if (descriptor < 0) return false;
    receive_timeout(descriptor, client.Timeout);
    const ssize_t amount = send(descriptor, data.data(), data.size(), 0);
    if (amount < 0 || static_cast<std::size_t>(amount) != data.size()) {
        error = amount < 0 ? std::strerror(errno) : "partial datagram";
        close(descriptor); return false;
    }
    close(descriptor); return true;
}

bool UDP::Exchange(const CLIENT& client, std::string_view request,
                   RECEIVE& response, std::size_t maximum)
{
    response = {};
    std::string error;
    const int descriptor = connect_socket(client, SOCK_DGRAM, IPPROTO_UDP, error);
    if (descriptor < 0) { response.Error = error; return false; }
    receive_timeout(descriptor, client.Timeout);
    const ssize_t sent = send(descriptor, request.data(), request.size(), 0);
    if (sent < 0 || static_cast<std::size_t>(sent) != request.size()) {
        response.Error = sent < 0 ? std::strerror(errno) : "partial datagram";
        close(descriptor); return false;
    }
    response.Data.resize(maximum);
    const ssize_t amount = recv(descriptor, response.Data.data(), maximum, 0);
    if (amount < 0) { response.Error = std::strerror(errno); response.Data.clear(); close(descriptor); return false; }
    response.Data.resize(static_cast<std::size_t>(amount));
    response.Transferred = response.Data.size(); close(descriptor); return true;
}

bool INTERNET::Resolve(std::string_view host, std::string_view service,
                       std::vector<IP>& addresses, std::string& error)
{
    addresses.clear(); error.clear();
    addrinfo hints {};
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    addrinfo* result = nullptr;
    const std::string host_text(host);
    const std::string service_text(service);
    const int status = getaddrinfo(host_text.c_str(), service.empty() ? nullptr : service_text.c_str(),
                                   &hints, &result);
    if (status != 0) { error = gai_strerror(status); return false; }
    for (addrinfo* current = result; current; current = current->ai_next) {
        char buffer[NI_MAXHOST] {};
        if (getnameinfo(current->ai_addr, current->ai_addrlen, buffer, sizeof(buffer),
                        nullptr, 0, NI_NUMERICHOST) == 0) {
            IP ip(buffer);
            if (ip.Is_Valid() && std::none_of(addresses.begin(), addresses.end(),
                [&](const IP& existing) { return existing.Address() == ip.Address(); })) {
                addresses.push_back(ip);
            }
        }
    }
    freeaddrinfo(result);
    if (addresses.empty()) { error = "no addresses returned"; return false; }
    return true;
}

std::string NETWORK::Local_Hostname()
{
    std::array<char, 256> buffer {};
    return gethostname(buffer.data(), buffer.size()) == 0 ? std::string(buffer.data()) : std::string();
}
bool NETWORK::Local_Addresses(std::vector<IP>& addresses, std::string& error)
{
    addresses.clear(); error.clear();
    ifaddrs* interfaces = nullptr;
    if (getifaddrs(&interfaces) != 0) {
        const std::string interface_error = std::strerror(errno);
        const std::string hostname = Local_Hostname();
        if (!hostname.empty() && INTERNET::Resolve(hostname, "", addresses, error)) {
            return true;
        }
        error = interface_error;
        return false;
    }
    for (ifaddrs* current = interfaces; current; current = current->ifa_next) {
        if (!current->ifa_addr || (current->ifa_addr->sa_family != AF_INET &&
                                   current->ifa_addr->sa_family != AF_INET6)) continue;
        char buffer[NI_MAXHOST] {};
        const socklen_t length = current->ifa_addr->sa_family == AF_INET
            ? sizeof(sockaddr_in) : sizeof(sockaddr_in6);
        if (getnameinfo(current->ifa_addr, length, buffer, sizeof(buffer), nullptr, 0,
                        NI_NUMERICHOST) == 0) {
            IP ip(buffer);
            if (ip.Is_Valid() && std::none_of(addresses.begin(), addresses.end(),
                [&](const IP& existing) { return existing.Address() == ip.Address(); })) {
                addresses.push_back(ip);
            }
        }
    }
    freeifaddrs(interfaces); return true;
}

} // namespace NET

namespace {

void help()
{
    std::cout
        << "tcpip " << NET::TCPIP::Version << " - independent TCP/IP toolkit\n\n"
        << "Usage:\n"
        << "  tcpip validate ip|hostname|fqdn|mac|port VALUE\n"
        << "  tcpip resolve HOST [SERVICE]\n"
        << "  tcpip local\n"
        << "  tcpip hosts [FILE]\n"
        << "  tcpip policy allow|deny IP PORT tcp|udp\n"
        << "  tcpip probe tcp HOST PORT [TIMEOUT_MS]\n"
        << "  tcpip send tcp HOST PORT DATA [TIMEOUT_MS] [MAXIMUM]\n"
        << "  tcpip send udp HOST PORT DATA [TIMEOUT_MS]\n"
        << "  tcpip exchange udp HOST PORT DATA [TIMEOUT_MS] [MAXIMUM]\n"
        << "  tcpip --help\n"
        << "  tcpip --version\n";
}

bool parse_unsigned(std::string_view text, unsigned long long& value)
{
    const auto result = std::from_chars(text.data(), text.data() + text.size(), value);
    return result.ec == std::errc{} && result.ptr == text.data() + text.size();
}

bool make_client(std::string_view name, std::string_view port_text,
                 std::string_view timeout_text, NET::CLIENT& client)
{
    NET::PORT port;
    if (!NET::PORT::Parse(port_text, port)) { std::cerr << "tcpip: invalid port\n"; return false; }
    unsigned long long timeout = 3000;
    if (!timeout_text.empty() && (!parse_unsigned(timeout_text, timeout) || timeout == 0 ||
        timeout > 3600000)) { std::cerr << "tcpip: invalid timeout\n"; return false; }
    client.Remote.Name = std::string(name);
    client.Remote.Address = NET::IP(std::string(name));
    client.Remote.Service_Port = port;
    client.Timeout = std::chrono::milliseconds(timeout);
    return client.Is_Valid();
}

int validate(std::string_view type, std::string_view value)
{
    if (type == "ip") {
        NET::IP ip{std::string(value)};
        if (!ip.Is_Valid()) { std::cout << "invalid\n"; return 2; }
        std::cout << "valid " << (ip.Family() == NET::IP::FAMILY::IPv4 ? "IPv4" : "IPv6")
                  << (ip.Is_Loopback() ? " loopback" : " global-or-special") << '\n'; return 0;
    }
    if (type == "hostname") { const bool valid = NET::HOSTNAME::Validate(value); std::cout << (valid ? "valid" : "invalid") << '\n'; return valid ? 0 : 2; }
    if (type == "fqdn") { const bool valid = NET::FQDN::Validate(value); std::cout << (valid ? "valid" : "invalid") << '\n'; return valid ? 0 : 2; }
    if (type == "mac") {
        NET::MAC mac; if (!NET::MAC::Parse(value, mac)) { std::cout << "invalid\n"; return 2; }
        std::cout << "valid " << (mac.Is_Locally_Administered() ? "locally-administered" : "universally-administered")
                  << ' ' << (mac.Is_Multicast() ? "multicast" : "unicast") << '\n'; return 0;
    }
    if (type == "port") {
        NET::PORT port; if (!NET::PORT::Parse(value, port)) { std::cout << "invalid\n"; return 2; }
        std::cout << "valid " << (port.Is_Privileged() ? "privileged" : "unprivileged") << '\n'; return 0;
    }
    std::cerr << "tcpip: unknown validation type\n"; return 2;
}

} // namespace

int main(int argc, char* argv[])
{
    if (argc == 1) { help(); return 0; }
    const std::string_view command = argv[1];
    if (command == "--help" || command == "-h" || command == "help") { help(); return 0; }
    if (command == "--version" || command == "-v") { std::cout << "tcpip " << NET::TCPIP::Version << '\n'; return 0; }
    if (command == "validate" && argc == 4) return validate(argv[2], argv[3]);
    if (command == "resolve" && (argc == 3 || argc == 4)) {
        std::vector<NET::IP> addresses; std::string error;
        if (!NET::INTERNET::Resolve(argv[2], argc == 4 ? argv[3] : "", addresses, error)) {
            std::cerr << "tcpip: " << error << '\n'; return 3;
        }
        for (const auto& address : addresses) std::cout << address.Address() << '\n';
        return 0;
    }
    if (command == "local" && argc == 2) {
        std::vector<NET::IP> addresses; std::string error;
        if (!NET::NETWORK::Local_Addresses(addresses, error)) { std::cerr << "tcpip: " << error << '\n'; return 3; }
        std::cout << "hostname=" << NET::NETWORK::Local_Hostname() << '\n';
        for (const auto& address : addresses) std::cout << "address=" << address.Address() << '\n';
        return 0;
    }
    if (command == "hosts" && (argc == 2 || argc == 3)) {
        NET::HOSTS hosts; std::string error;
        if (!hosts.Load_File(argc == 3 ? argv[2] : "/etc/hosts", error)) { std::cerr << "tcpip: " << error << '\n'; return 3; }
        for (const auto& host : hosts.List()) std::cout << host.Address.Address() << '\t' << host.Name << '\n';
        return 0;
    }
    if (command == "policy" && argc == 6) {
        NET::IP ip(argv[3]); NET::PORT port;
        if (!ip.Is_Valid() || !NET::PORT::Parse(argv[4], port) ||
            (std::string_view(argv[5]) != "tcp" && std::string_view(argv[5]) != "udp")) {
            std::cerr << "tcpip: invalid policy endpoint\n"; return 2;
        }
        NET::FIREWALL firewall;
        if (std::string_view(argv[2]) == "allow") { NET::ALLOW rule; rule.Address = ip; rule.Service_Port = port; rule.Protocol = argv[5]; firewall.Add(rule); }
        else if (std::string_view(argv[2]) == "deny") { NET::DENY rule; rule.Address = ip; rule.Service_Port = port; rule.Protocol = argv[5]; firewall.Add(rule); }
        else { std::cerr << "tcpip: policy must be allow or deny\n"; return 2; }
        const auto decision = firewall.Evaluate(ip, port, argv[5]);
        std::cout << (decision == NET::FIREWALL::DECISION::Allow ? "allow" : "deny") << '\n'; return 0;
    }
    if (command == "probe" && (argc == 5 || argc == 6) && std::string_view(argv[2]) == "tcp") {
        NET::CLIENT client; if (!make_client(argv[3], argv[4], argc == 6 ? argv[5] : "", client)) return 2;
        std::string error; if (!NET::TCP::Probe(client, error)) { std::cerr << "tcpip: " << error << '\n'; return 4; }
        std::cout << "reachable\n"; return 0;
    }
    if ((command == "send" || command == "exchange") && argc >= 6 && argc <= 8) {
        const std::string_view protocol = argv[2];
        NET::CLIENT client; if (!make_client(argv[3], argv[4], argc >= 7 ? argv[6] : "", client)) return 2;
        unsigned long long maximum = 65536;
        if (argc == 8 && (!parse_unsigned(argv[7], maximum) || maximum == 0 || maximum > 16777216)) {
            std::cerr << "tcpip: invalid maximum response size\n"; return 2;
        }
        if (protocol == "udp" && command == "send") {
            std::string error; if (!NET::UDP::Send(client, argv[5], error)) { std::cerr << "tcpip: " << error << '\n'; return 4; }
            std::cout << "sent\n"; return 0;
        }
        NET::RECEIVE response;
        const bool success = protocol == "tcp"
            ? NET::TCP::Exchange(client, argv[5], response, static_cast<std::size_t>(maximum))
            : protocol == "udp" && command == "exchange"
                ? NET::UDP::Exchange(client, argv[5], response, static_cast<std::size_t>(maximum))
                : false;
        if (!success) { std::cerr << "tcpip: " << (response.Error.empty() ? "invalid operation" : response.Error) << '\n'; return 4; }
        std::cout.write(reinterpret_cast<const char*>(response.Data.data()), response.Data.size());
        return 0;
    }

    std::cerr << "tcpip: invalid command or argument count\nTry 'tcpip --help' for usage.\n";
    return 2;
}
