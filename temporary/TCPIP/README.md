# Independent TCP/IP Toolkit

## Overview

`tcpip` is a standalone C++17/POSIX network toolkit and command-line utility.
It provides validated network value objects, DNS and local-host discovery,
hosts-file parsing, application-level policy evaluation, routing models, and
timeout-controlled TCP and UDP client operations.

The project is independent of external C++ libraries. It uses the operating
system's standard POSIX networking interfaces.

## Structure

```text
tcpip/
├── allow.hpp
├── client.hpp
├── deny.hpp
├── firewall.hpp
├── fqdn.hpp
├── gateway.hpp
├── globalhost.hpp
├── group.hpp
├── host.hpp
├── hostname.hpp
├── hosts.hpp
├── internet.hpp
├── ip.hpp
├── localhost.hpp
├── mac.hpp
├── Makefile
├── map.hpp
├── network.hpp
├── port.hpp
├── proxy.hpp
├── receive.hpp
├── route.hpp
├── router.hpp
├── send.hpp
├── server.hpp
├── tcp.hpp
├── tcpip.cpp
├── tcpip.hpp
├── tcpip.md
└── udp.hpp
```

Each header owns one focused network class. `tcpip.hpp` is the umbrella header
for consumers requiring the complete network model.

## Requirements

- Linux or another POSIX-compatible operating system
- A C++17-compatible compiler
- GNU Make
- POSIX sockets, `getaddrinfo`, `getifaddrs`, and `poll`

On Debian-based systems:

```bash
sudo apt update
sudo apt install g++ make
```

## Build and validate

```bash
make
make check
```

The deterministic checks validate IPv4, IPv6, hostnames, FQDNs, MAC addresses,
ports, and application firewall decisions without requiring Internet access.

Additional targets:

```bash
make debug
make rebuild
make clean
```

## Installation

```bash
sudo make install
tcpip --version
```

The default target is `/usr/local/bin/tcpip`.

Custom prefix:

```bash
sudo make install PREFIX=/opt/tcpip
```

Staged installation:

```bash
make install DESTDIR=/tmp/tcpip-package PREFIX=/usr
```

Uninstall:

```bash
sudo make uninstall
```

## Validate network values

### IP addresses

```bash
tcpip validate ip 127.0.0.1
tcpip validate ip 2001:db8::1
```

The validator distinguishes IPv4, IPv6, loopback, and other valid addresses.

### Hostnames

```bash
tcpip validate hostname espoo02
```

Hostnames are validated as individual ASCII DNS labels: 1–63 characters,
letters/digits/hyphens, without a leading or trailing hyphen.

### Fully qualified domain names

```bash
tcpip validate fqdn example.com
```

FQDN validation checks total length and each individual DNS label. A terminal
root dot is accepted. Internationalized domains must be supplied in their
ASCII-compatible encoded form.

### MAC addresses

```bash
tcpip validate mac 02:00:5E:10:00:00
```

Colon-separated and hyphen-separated 48-bit MAC addresses are accepted. The
result identifies multicast/unicast and locally/universally administered bits.

### Ports

```bash
tcpip validate port 443
tcpip validate port 9966
```

The valid numeric range is `0` through `65535`. Ports below `1024` are reported
as privileged.

## DNS resolution

Resolve a hostname using the operating system resolver:

```bash
tcpip resolve localhost
tcpip resolve example.com 443
```

Results are deduplicated numeric IPv4 and IPv6 addresses. Resolver policy,
`/etc/hosts`, DNS configuration, and address ordering remain controlled by the
operating system.

## Local network information

```bash
tcpip local
```

The command reports:

```text
hostname=<system hostname>
address=<local address>
```

Interface enumeration can be restricted by a container, sandbox, capability
policy, or operating-system security profile. When direct enumeration is
unavailable, the implementation attempts a resolver-based hostname fallback;
otherwise it reports the operating-system error rather than bypassing policy.

## Hosts files

Read the system hosts file:

```bash
tcpip hosts
```

Read another hosts-format file:

```bash
tcpip hosts ./project.hosts
```

Blank lines and `#` comments are ignored. Each hostname is indexed against its
validated address.

## Application policy

Evaluate an allow rule:

```bash
tcpip policy allow 127.0.0.1 6699 tcp
```

Evaluate a deny rule:

```bash
tcpip policy deny 127.0.0.1 80 tcp
```

The policy model follows deny-first precedence:

```text
matching deny → deny
matching allow → allow
no match       → configured default
```

This is an in-process policy evaluator. It does not modify nftables, iptables,
firewalld, routing tables, kernel policy, or system configuration.

## TCP probe

```bash
tcpip probe tcp HOST PORT [TIMEOUT_MS]
```

Example:

```bash
tcpip probe tcp 127.0.0.1 6699 2000
```

A successful connection prints:

```text
reachable
```

The timeout defaults to 3000 milliseconds and is limited to one hour.

## TCP exchange

```bash
tcpip send tcp HOST PORT DATA [TIMEOUT_MS] [MAXIMUM_BYTES]
```

Example HTTP request using Bash ANSI-C quoting:

```bash
tcpip send tcp example.com 80 $'GET / HTTP/1.0\r\nHost: example.com\r\n\r\n' 3000 65536
```

The client connects, sends the complete request, closes its write direction,
and receives up to the configured maximum. The default maximum is 65,536
bytes; the command-line safety limit is 16 MiB.

## UDP send and exchange

Send one datagram without awaiting a response:

```bash
tcpip send udp HOST PORT DATA [TIMEOUT_MS]
```

Send one datagram and receive one response:

```bash
tcpip exchange udp HOST PORT DATA [TIMEOUT_MS] [MAXIMUM_BYTES]
```

UDP delivery is not guaranteed. A successful send confirms that the operating
system accepted the datagram, not that the remote application received it.

## Exit status

| Status | Meaning |
| ---: | --- |
| `0` | Operation completed successfully |
| `2` | Invalid command, argument, value, or policy |
| `3` | Resolver, hosts-file, or local-discovery failure |
| `4` | TCP/UDP connection, send, receive, or timeout failure |

Normal data uses standard output and diagnostics use standard error.

## Header architecture

| Header | Model |
| --- | --- |
| `ip.hpp` | IPv4/IPv6 address and family |
| `port.hpp` | Validated 16-bit service port |
| `hostname.hpp` | Single DNS label |
| `fqdn.hpp` | Multi-label domain name |
| `mac.hpp` | 48-bit MAC address |
| `host.hpp` | Name/address/port endpoint |
| `localhost.hpp` | IPv4/IPv6 loopback factories |
| `globalhost.hpp` | Non-loopback global-host wrapper |
| `group.hpp` | Named host collection |
| `hosts.hpp` | Hosts-file and hostname index |
| `map.hpp` | Alias-to-host mapping |
| `gateway.hpp` | Gateway address, interface, and metric |
| `route.hpp` | Destination prefix and gateway |
| `router.hpp` | Route collection and default-route lookup |
| `allow.hpp` | Allow policy rule |
| `deny.hpp` | Deny policy rule |
| `firewall.hpp` | Deny-first application policy evaluator |
| `client.hpp` | Remote endpoint and timeout |
| `server.hpp` | Local endpoint and backlog descriptor |
| `proxy.hpp` | HTTP, HTTPS, or SOCKS5 proxy descriptor |
| `send.hpp` | Send-state record |
| `receive.hpp` | Receive-state record |
| `tcp.hpp` | TCP probe and exchange operations |
| `udp.hpp` | UDP send and exchange operations |
| `internet.hpp` | Operating-system name resolution |
| `network.hpp` | Local hostname and interface discovery |
| `tcpip.hpp` | Complete umbrella interface |

## C++ examples

Include the complete interface:

```cpp
#include "tcpip.hpp"
```

### Address and port

```cpp
NET::IP address("127.0.0.1");
NET::PORT port;

bool parsed = NET::PORT::Parse("6699", port);
bool loopback = address.Is_Loopback();
```

### Host endpoint

```cpp
NET::HOST host;
host.Name = "localhost";
host.Address = NET::IP("127.0.0.1");
host.Service_Port = NET::PORT(6699);

std::string endpoint = host.Endpoint();
```

### DNS resolution

```cpp
std::vector<NET::IP> addresses;
std::string error;

bool resolved = NET::INTERNET::Resolve(
    "localhost",
    "6699",
    addresses,
    error
);
```

### Application firewall

```cpp
NET::ALLOW allow;
allow.Address = NET::IP("127.0.0.1");
allow.Service_Port = NET::PORT(6699);
allow.Protocol = "tcp";

NET::FIREWALL firewall;
firewall.Default(NET::FIREWALL::DECISION::Deny);
firewall.Add(allow);

auto decision = firewall.Evaluate(
    NET::IP("127.0.0.1"),
    NET::PORT(6699),
    "tcp"
);
```

An invalid rule address or port acts as a wildcard when rules are constructed
directly through the API.

### TCP client

```cpp
NET::CLIENT client;
client.Remote.Name = "localhost";
client.Remote.Service_Port = NET::PORT(6699);
client.Timeout = std::chrono::milliseconds(3000);

NET::RECEIVE response;

bool completed = NET::TCP::Exchange(
    client,
    "request",
    response,
    65536
);
```

### UDP client

```cpp
std::string error;

bool sent = NET::UDP::Send(
    client,
    "datagram",
    error
);
```

## Security and operational boundaries

- Validation does not establish trust in an address or hostname.
- DNS results can change and must not be treated as permanent identity.
- The TCP/UDP layer is unencrypted; use TLS or another authenticated protocol
  when confidentiality and peer authentication are required.
- Proxy configuration is modeled but proxy tunnelling is not automatically
  applied to direct TCP/UDP operations.
- Server configuration is modeled, but this release does not expose a listener
  command.
- Route and gateway classes do not mutate kernel routing tables.
- Firewall policy remains local to the application object.
- Network operations obey operating-system permissions and capability policy.

## Version

```text
1.0.0
```
