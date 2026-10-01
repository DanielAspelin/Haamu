#include "domain.hpp"

#include <algorithm>
#include <arpa/inet.h>
#include <charconv>
#include <chrono>
#include <cctype>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <netdb.h>
#include <sstream>
#include <string>
#include <string_view>
#include <system_error>
#include <utility>
#include <vector>

namespace {

std::string lowercase(std::string_view value)
{
    std::string result(value);
    std::transform(result.begin(), result.end(), result.begin(), [](unsigned char c) {
        return static_cast<char>(std::tolower(c));
    });
    return result;
}

bool label_valid(std::string_view value) noexcept
{
    if (value.empty() || value.size() > 63 || value.front() == '-' || value.back() == '-') {
        return false;
    }
    for (unsigned char character : value) {
        if (!std::isalnum(character) && character != '-') return false;
    }
    return true;
}

bool port_parse(std::string_view value, std::uint16_t& output) noexcept
{
    unsigned parsed = 0;
    const auto result = std::from_chars(value.data(), value.data() + value.size(), parsed);
    if (result.ec != std::errc{} || result.ptr != value.data() + value.size() ||
        parsed == 0 || parsed > 65535) return false;
    output = static_cast<std::uint16_t>(parsed); return true;
}

bool address_valid(std::string_view value) noexcept
{
    if (value.empty()) return true;
    unsigned char bytes[16] {};
    const std::string text(value);
    return inet_pton(AF_INET, text.c_str(), bytes) == 1 ||
           inet_pton(AF_INET6, text.c_str(), bytes) == 1;
}

bool registry_field_valid(std::string_view value) noexcept
{
    return value.find_first_of("\t\r\n") == std::string_view::npos;
}

} // namespace

namespace DOMAIN {

DOMAIN_NAME::DOMAIN_NAME(std::string value)
    : Name(Normalize(value)), Valid(Validate(Name)) {}

bool DOMAIN_NAME::Validate(std::string_view value) noexcept
{
    if (!value.empty() && value.back() == '.') value.remove_suffix(1);
    if (value.empty() || value.size() > 253 || value.find('.') == std::string_view::npos) {
        return false;
    }
    while (!value.empty()) {
        const auto separator = value.find('.');
        if (!label_valid(value.substr(0, separator))) return false;
        if (separator == std::string_view::npos) break;
        value.remove_prefix(separator + 1);
    }
    return true;
}

std::string DOMAIN_NAME::Normalize(std::string_view value)
{
    if (!value.empty() && value.back() == '.') value.remove_suffix(1);
    return lowercase(value);
}
bool DOMAIN_NAME::Is_Valid() const noexcept { return Valid; }
const std::string& DOMAIN_NAME::Value() const noexcept { return Name; }

TLD::TLD(std::string value) : Name(lowercase(value)), Valid(Validate(Name)) {}
bool TLD::Validate(std::string_view value) noexcept
{
    if (!value.empty() && value.front() == '.') value.remove_prefix(1);
    if (!label_valid(value) || value.size() < 2) return false;
    for (unsigned char character : value) if (!std::isalpha(character) && character != '-') return false;
    return true;
}
bool TLD::Is_Valid() const noexcept { return Valid; }
const std::string& TLD::Value() const noexcept { return Name; }

SUBDOMAIN::SUBDOMAIN(std::string value) : Name(lowercase(value)), Valid(Validate(Name)) {}
bool SUBDOMAIN::Validate(std::string_view value) noexcept
{
    if (value.empty() || value.size() > 253) return false;
    while (!value.empty()) {
        const auto separator = value.find('.');
        if (!label_valid(value.substr(0, separator))) return false;
        if (separator == std::string_view::npos) break;
        value.remove_prefix(separator + 1);
    }
    return true;
}
bool SUBDOMAIN::Is_Valid() const noexcept { return Valid; }
const std::string& SUBDOMAIN::Value() const noexcept { return Name; }

bool URI::Parse(std::string_view value, URI& output)
{
    output = {};
    const auto colon = value.find(':');
    if (colon == std::string_view::npos || colon == 0 ||
        !std::isalpha(static_cast<unsigned char>(value.front()))) return false;
    for (char c : value.substr(0, colon)) {
        if (!std::isalnum(static_cast<unsigned char>(c)) && c != '+' && c != '-' && c != '.') return false;
    }
    output.Scheme = lowercase(value.substr(0, colon));
    value.remove_prefix(colon + 1);
    if (value.substr(0, 2) == "//") {
        value.remove_prefix(2);
        const auto end = value.find_first_of("/?#");
        output.Authority = std::string(value.substr(0, end));
        value = end == std::string_view::npos ? std::string_view() : value.substr(end);
    }
    const auto fragment = value.find('#');
    if (fragment != std::string_view::npos) {
        output.Fragment = std::string(value.substr(fragment + 1)); value = value.substr(0, fragment);
    }
    const auto query = value.find('?');
    if (query != std::string_view::npos) {
        output.Query = std::string(value.substr(query + 1)); value = value.substr(0, query);
    }
    output.Path = std::string(value);
    return output.Is_Valid();
}
bool URI::Is_Valid() const noexcept { return !Scheme.empty(); }
std::string URI::String() const
{
    std::string value = Scheme + ':';
    if (!Authority.empty()) value += "//" + Authority;
    value += Path;
    if (!Query.empty()) value += '?' + Query;
    if (!Fragment.empty()) value += '#' + Fragment;
    return value;
}

bool URL::Parse(std::string_view value, URL& output)
{
    URI uri;
    if (!URI::Parse(value, uri) || uri.Authority.empty() ||
        (uri.Scheme != "http" && uri.Scheme != "https")) return false;
    std::string_view authority = uri.Authority;
    if (authority.find('@') != std::string_view::npos || authority.front() == '[') return false;
    const auto colon = authority.rfind(':');
    std::uint16_t port = uri.Scheme == "https" ? 443 : 80;
    if (colon != std::string_view::npos) {
        if (!port_parse(authority.substr(colon + 1), port)) return false;
        authority = authority.substr(0, colon);
    }
    DOMAIN_NAME domain{std::string(authority)};
    if (!domain.Is_Valid()) return false;
    output = {};
    output.Scheme = uri.Scheme;
    output.Domain = domain;
    output.Port = port;
    output.Path = uri.Path.empty() ? "/" : uri.Path;
    output.Query = uri.Query;
    output.Fragment = uri.Fragment;
    return true;
}
bool URL::Is_Valid() const noexcept
{ return (Scheme == "http" || Scheme == "https") && Domain.Is_Valid() && Port != 0; }
std::string URL::String() const
{
    std::string value = Scheme + "://" + Domain.Value();
    const bool standard = (Scheme == "http" && Port == 80) || (Scheme == "https" && Port == 443);
    if (!standard) value += ':' + std::to_string(Port);
    value += Path.empty() ? "/" : Path;
    if (!Query.empty()) value += '?' + Query;
    if (!Fragment.empty()) value += '#' + Fragment;
    return value;
}

bool ENTRY::Is_Valid() const noexcept
{
    return Name.Is_Valid() && !Root.empty() && registry_field_valid(Root) &&
           registry_field_valid(Address) && address_valid(Address) &&
           (!HTTP_Enabled || HTTP_Port != 0) && (!HTTPS_Enabled || HTTPS_Port != 0);
}

bool DOMAIN_LIST::Add(const ENTRY& entry)
{
    if (!entry.Is_Valid() || Find(entry.Name.Value())) return false;
    Values.push_back(entry); return true;
}
bool DOMAIN_LIST::Remove(std::string_view name)
{
    const std::string normalized = DOMAIN_NAME::Normalize(name);
    const auto found = std::find_if(Values.begin(), Values.end(), [&](const ENTRY& entry) {
        return entry.Name.Value() == normalized;
    });
    if (found == Values.end()) return false;
    Values.erase(found); return true;
}
const ENTRY* DOMAIN_LIST::Find(std::string_view name) const
{
    const std::string normalized = DOMAIN_NAME::Normalize(name);
    const auto found = std::find_if(Values.begin(), Values.end(), [&](const ENTRY& entry) {
        return entry.Name.Value() == normalized;
    });
    return found == Values.end() ? nullptr : &*found;
}
const std::vector<ENTRY>& DOMAIN_LIST::Entries() const noexcept { return Values; }

bool DOMAIN_LIST::Load(const std::string& path, std::string& error)
{
    Values.clear(); error.clear();
    if (!std::filesystem::exists(path)) return true;
    std::ifstream stream(path);
    if (!stream) { error = "could not open registry"; return false; }
    std::string line;
    std::size_t line_number = 0;
    while (std::getline(stream, line)) {
        ++line_number;
        if (line.empty()) continue;
        std::istringstream fields(line);
        std::string name, root, address, created;
        unsigned http_port = 0, https_port = 0, http = 0, https = 0;
        if (!std::getline(fields, name, '\t') || !std::getline(fields, root, '\t') ||
            !std::getline(fields, address, '\t') || !(fields >> http_port) || fields.get() != '\t' ||
            !(fields >> https_port) || fields.get() != '\t' || !(fields >> http) ||
            fields.get() != '\t' || !(fields >> https) || fields.get() != '\t' ||
            !std::getline(fields, created)) {
            error = "invalid registry record at line " + std::to_string(line_number); return false;
        }
        long long epoch = 0;
        const auto parsed = std::from_chars(created.data(), created.data() + created.size(), epoch);
        ENTRY entry;
        entry.Name = DOMAIN_NAME(name); entry.Root = root; entry.Address = address;
        entry.HTTP_Port = static_cast<std::uint16_t>(http_port);
        entry.HTTPS_Port = static_cast<std::uint16_t>(https_port);
        entry.HTTP_Enabled = http != 0; entry.HTTPS_Enabled = https != 0;
        entry.Created = std::chrono::system_clock::time_point(std::chrono::seconds(epoch));
        if (http_port > 65535 || https_port > 65535 || parsed.ec != std::errc{} ||
            parsed.ptr != created.data() + created.size() || !Add(entry)) {
            error = "invalid or duplicate registry entry at line " + std::to_string(line_number); return false;
        }
    }
    if (stream.bad()) { error = "failed while reading registry"; return false; }
    return true;
}

bool DOMAIN_LIST::Save(const std::string& path, std::string& error) const
{
    error.clear();
    const std::filesystem::path target(path);
    if (!target.parent_path().empty()) {
        std::error_code ec;
        std::filesystem::create_directories(target.parent_path(), ec);
        if (ec) { error = "could not create registry directory: " + ec.message(); return false; }
    }
    const std::filesystem::path temporary = target.string() + ".tmp";
    std::ofstream stream(temporary, std::ios::trunc);
    if (!stream) { error = "could not create temporary registry"; return false; }
    for (const auto& entry : Values) {
        const auto epoch = std::chrono::duration_cast<std::chrono::seconds>(
            entry.Created.time_since_epoch()).count();
        stream << entry.Name.Value() << '\t' << entry.Root << '\t' << entry.Address << '\t'
               << entry.HTTP_Port << '\t' << entry.HTTPS_Port << '\t'
               << entry.HTTP_Enabled << '\t' << entry.HTTPS_Enabled << '\t' << epoch << '\n';
    }
    stream.close();
    if (!stream) { error = "could not write registry"; return false; }
    std::error_code ec;
    std::filesystem::rename(temporary, target, ec);
    if (ec) {
        std::filesystem::remove(target, ec); ec.clear();
        std::filesystem::rename(temporary, target, ec);
    }
    if (ec) { error = "could not replace registry: " + ec.message(); return false; }
    return true;
}

bool ADD_DOMAIN::Apply(DOMAIN_LIST& list, const ENTRY& entry, std::string& error)
{ if (!entry.Is_Valid()) { error = "invalid domain entry"; return false; } if (!list.Add(entry)) { error = "domain already exists"; return false; } error.clear(); return true; }
bool REMOVE_DOMAIN::Apply(DOMAIN_LIST& list, std::string_view name, std::string& error)
{ if (!list.Remove(name)) { error = "domain not found"; return false; } error.clear(); return true; }

bool SUBDOMAIN_LIST::Add(const SUBDOMAIN& value)
{ if (!value.Is_Valid()) return false; for (const auto& item : Values) if (item.Value() == value.Value()) return false; Values.push_back(value); return true; }
bool SUBDOMAIN_LIST::Remove(std::string_view value)
{ const auto found = std::find_if(Values.begin(), Values.end(), [&](const SUBDOMAIN& item) { return item.Value() == lowercase(value); }); if (found == Values.end()) return false; Values.erase(found); return true; }
const std::vector<SUBDOMAIN>& SUBDOMAIN_LIST::Entries() const noexcept { return Values; }

bool CACHE::Is_Expired() const noexcept { return std::chrono::system_clock::now() >= Expires; }
void DOMAIN_CACHE::Put(CACHE entry) { Entries[entry.Key] = std::move(entry); }
const CACHE* DOMAIN_CACHE::Get(std::string_view key) const
{ const auto found = Entries.find(std::string(key)); return found == Entries.end() || found->second.Is_Expired() ? nullptr : &found->second; }
std::size_t DOMAIN_CACHE::Purge()
{ std::size_t removed = 0; for (auto iterator = Entries.begin(); iterator != Entries.end();) { if (iterator->second.Is_Expired()) { iterator = Entries.erase(iterator); ++removed; } else ++iterator; } return removed; }

bool DNS::Resolve(std::string_view name, std::vector<std::string>& addresses, std::string& error)
{
    addresses.clear(); error.clear();
    addrinfo hints {}; hints.ai_family = AF_UNSPEC; hints.ai_socktype = SOCK_STREAM;
    addrinfo* result = nullptr; const std::string host(name);
    const int status = getaddrinfo(host.c_str(), nullptr, &hints, &result);
    if (status != 0) { error = gai_strerror(status); return false; }
    for (addrinfo* current = result; current; current = current->ai_next) {
        char buffer[NI_MAXHOST] {};
        if (getnameinfo(current->ai_addr, current->ai_addrlen, buffer, sizeof(buffer), nullptr, 0, NI_NUMERICHOST) == 0 &&
            std::find(addresses.begin(), addresses.end(), buffer) == addresses.end()) addresses.emplace_back(buffer);
    }
    freeaddrinfo(result);
    if (addresses.empty()) { error = "no addresses returned"; return false; }
    return true;
}
bool DISCOVERY::Inspect(const ENTRY& entry, std::vector<std::string>& addresses, std::string& error)
{ if (!entry.Name.Is_Valid()) { error = "invalid domain"; return false; } return DNS::Resolve(entry.Name.Value(), addresses, error); }
bool NAMESERVER::Is_Valid() const noexcept { return DOMAIN_NAME::Validate(Name) && address_valid(Address); }
bool DHCP::Is_Valid() const noexcept { return !Enabled || (address_valid(Address) && !Address.empty() && Lease.count() > 0); }
bool COOKIE::Is_Valid() const noexcept { return !Name.empty() && Name.find_first_of(";= \t\r\n") == std::string::npos && !Path.empty(); }
bool API::Is_Valid() const noexcept { return !Name.empty() && Endpoint.Is_Valid() && !Version.empty(); }
bool DOMAIN_SERVICE::Is_Valid() const noexcept { return !Name.empty() && (Protocol == "tcp" || Protocol == "udp") && Port != 0; }
bool SSL::Is_Valid() const noexcept { return !Enabled || (!Certificate.empty() && !Private_Key.empty()); }
bool VPN::Is_Valid() const noexcept { return !Enabled || (!Interface.empty() && !Address.empty() && address_valid(Address)); }
bool HTDOCS::Exists() const { return std::filesystem::is_directory(Path); }
bool WWW_ROOT::Exists() const { return std::filesystem::is_directory(Path); }
bool INDEX_ROOT::Is_File() const { return std::filesystem::is_regular_file(Path); }
bool VIRTUAL_HOST::Is_Valid() const noexcept
{ return Name.Is_Valid() && !Root.empty() && HTTP_Config.Is_Valid() && HTTPS_Config.Is_Valid() && (!HTTPS_Config.Enabled || TLS.Is_Valid()); }
std::filesystem::path LOCATOR::Domain_Root(const std::filesystem::path& base, const DOMAIN_NAME& name)
{ return name.Is_Valid() ? base / name.Value() : std::filesystem::path(); }
std::filesystem::path LOCATOR::Index(const std::filesystem::path& root, const std::string& entry)
{ return root / entry; }
SUBDOMAIN WWW::Prefix() { return SUBDOMAIN("www"); }
bool WEB::Add(const VIRTUAL_HOST& host) { if (!host.Is_Valid()) return false; Values.push_back(host); return true; }
const std::vector<VIRTUAL_HOST>& WEB::Hosts() const noexcept { return Values; }

DOMAIN_CONTROLLER::DOMAIN_CONTROLLER(std::string registry) : Registry(std::move(registry)) {}
bool DOMAIN_CONTROLLER::Load(std::string& error) { return Domains.Load(Registry, error); }
bool DOMAIN_CONTROLLER::Save(std::string& error) const { return Domains.Save(Registry, error); }
bool DOMAIN_CONTROLLER::Add(const ENTRY& entry, std::string& error) { return ADD_DOMAIN::Apply(Domains, entry, error); }
bool DOMAIN_CONTROLLER::Remove(std::string_view name, std::string& error) { return REMOVE_DOMAIN::Apply(Domains, name, error); }
const DOMAIN_LIST& DOMAIN_CONTROLLER::List() const noexcept { return Domains; }

} // namespace DOMAIN

namespace {

void help()
{
    std::cout
        << "domain " << DOMAIN::DOMAIN::Version << " - independent domain controller\n\n"
        << "Usage:\n"
        << "  domain validate domain|tld|subdomain|uri|url VALUE\n"
        << "  domain inspect URL\n"
        << "  domain resolve DOMAIN\n"
        << "  domain add DOMAIN --root PATH [options]\n"
        << "  domain remove DOMAIN [--registry FILE]\n"
        << "  domain list [--registry FILE]\n\n"
        << "Add options:\n"
        << "  --address IP  --http-port PORT  --https-port PORT\n"
        << "  --https  --no-http  --registry FILE\n\n"
        << "Default registry: .domains.registry\n";
}

std::string registry_path(int argc, char* argv[])
{
    for (int index = 2; index + 1 < argc; ++index) {
        if (std::string_view(argv[index]) == "--registry") return argv[index + 1];
    }
    return ".domains.registry";
}

int validate(std::string_view type, std::string_view value)
{
    bool valid = false;
    if (type == "domain") valid = DOMAIN::DOMAIN_NAME::Validate(value);
    else if (type == "tld") valid = DOMAIN::TLD::Validate(value);
    else if (type == "subdomain") valid = DOMAIN::SUBDOMAIN::Validate(value);
    else if (type == "uri") { DOMAIN::URI uri; valid = DOMAIN::URI::Parse(value, uri); }
    else if (type == "url") { DOMAIN::URL url; valid = DOMAIN::URL::Parse(value, url); }
    else { std::cerr << "domain: unknown validation type\n"; return DOMAIN::EXIT::Invalid; }
    std::cout << (valid ? "valid" : "invalid") << '\n';
    return valid ? DOMAIN::EXIT::Success : DOMAIN::EXIT::Invalid;
}

} // namespace

int main(int argc, char* argv[])
{
    if (argc == 1) { help(); return 0; }
    const std::string_view command = argv[1];
    if (command == "--help" || command == "-h" || command == "help") { help(); return 0; }
    if (command == "--version" || command == "-v") { std::cout << "domain " << DOMAIN::DOMAIN::Version << '\n'; return 0; }
    if (command == "validate" && argc == 4) return validate(argv[2], argv[3]);
    if (command == "inspect" && argc == 3) {
        DOMAIN::URL url;
        if (!DOMAIN::URL::Parse(argv[2], url)) { std::cerr << "domain: invalid URL\n"; return 2; }
        std::cout << "scheme=" << url.Scheme << '\n' << "domain=" << url.Domain.Value() << '\n'
                  << "port=" << url.Port << '\n' << "path=" << url.Path << '\n'
                  << "query=" << url.Query << '\n' << "fragment=" << url.Fragment << '\n';
        return 0;
    }
    if (command == "resolve" && argc == 3) {
        DOMAIN::DOMAIN_NAME name(argv[2]);
        if (!name.Is_Valid()) { std::cerr << "domain: invalid domain\n"; return 2; }
        std::vector<std::string> addresses; std::string error;
        if (!DOMAIN::DNS::Resolve(name.Value(), addresses, error)) { std::cerr << "domain: " << error << '\n'; return 4; }
        for (const auto& address : addresses) std::cout << address << '\n';
        return 0;
    }

    const std::string registry = registry_path(argc, argv);
    DOMAIN::DOMAIN_CONTROLLER controller(registry);
    std::string error;
    if (!controller.Load(error)) { std::cerr << "domain: " << error << '\n'; return 3; }

    if (command == "list") {
        for (int index = 2; index < argc; ++index) {
            if (std::string_view(argv[index]) == "--registry") ++index;
            else { std::cerr << "domain: invalid list option\n"; return 2; }
        }
        for (const auto& entry : controller.List().Entries()) {
            std::cout << entry.Name.Value() << '\t' << entry.Root << '\t'
                      << entry.HTTP_Port << '\t' << entry.HTTPS_Port << '\t';
            if (entry.HTTP_Enabled) std::cout << "http";
            if (entry.HTTP_Enabled && entry.HTTPS_Enabled) std::cout << ',';
            if (entry.HTTPS_Enabled) std::cout << "https";
            std::cout << '\n';
        }
        return 0;
    }
    if (command == "remove" && argc >= 3) {
        for (int index = 3; index < argc; ++index) {
            if (std::string_view(argv[index]) == "--registry" && index + 1 < argc) ++index;
            else { std::cerr << "domain: invalid remove option\n"; return 2; }
        }
        if (!controller.Remove(argv[2], error)) { std::cerr << "domain: " << error << '\n'; return 5; }
        if (!controller.Save(error)) { std::cerr << "domain: " << error << '\n'; return 3; }
        std::cout << "removed " << DOMAIN::DOMAIN_NAME::Normalize(argv[2]) << '\n'; return 0;
    }
    if (command == "add" && argc >= 5) {
        DOMAIN::ENTRY entry;
        entry.Name = DOMAIN::DOMAIN_NAME(argv[2]);
        entry.Created = std::chrono::system_clock::now();
        for (int index = 3; index < argc; ++index) {
            const std::string_view option = argv[index];
            if (option == "--root" && index + 1 < argc) entry.Root = argv[++index];
            else if (option == "--address" && index + 1 < argc) entry.Address = argv[++index];
            else if (option == "--http-port" && index + 1 < argc) {
                if (!port_parse(argv[++index], entry.HTTP_Port)) { std::cerr << "domain: invalid HTTP port\n"; return 2; }
            } else if (option == "--https-port" && index + 1 < argc) {
                if (!port_parse(argv[++index], entry.HTTPS_Port)) { std::cerr << "domain: invalid HTTPS port\n"; return 2; }
            } else if (option == "--https") entry.HTTPS_Enabled = true;
            else if (option == "--no-http") entry.HTTP_Enabled = false;
            else if (option == "--registry" && index + 1 < argc) ++index;
            else { std::cerr << "domain: invalid add option\n"; return 2; }
        }
        if (!controller.Add(entry, error)) { std::cerr << "domain: " << error << '\n'; return 5; }
        if (!controller.Save(error)) { std::cerr << "domain: " << error << '\n'; return 3; }
        std::cout << "added " << entry.Name.Value() << '\n'; return 0;
    }

    std::cerr << "domain: invalid command or argument count\nTry 'domain --help' for usage.\n";
    return 2;
}
