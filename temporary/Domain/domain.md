# Independent Domain Controller

`domain` is a C++17 domain-management component and command-line program. It validates and normalizes domain identifiers, parses HTTP(S) URLs, resolves domains through the operating-system resolver, and maintains a small local domain registry.

The project is deliberately non-invasive. Its DHCP, VPN, SSL, HTTP, HTTPS, DNS, and virtual-host types describe configuration; they do not change network interfaces, issue certificates, edit resolver files, or reconfigure a web server.

## Build

Requirements are a C++17 compiler, POSIX networking headers and resolver functions, and GNU Make.

```sh
make
make check
```

The executable is `./domain`. Run `make clean` to remove build and test artifacts.

## Command line

```text
domain validate domain|tld|subdomain|uri|url VALUE
domain inspect URL
domain resolve DOMAIN
domain add DOMAIN --root PATH [options]
domain remove DOMAIN [--registry FILE]
domain list [--registry FILE]
```

Examples:

```sh
./domain validate domain Example.COM.
./domain validate url 'https://www.example.com:8443/docs?q=cpp'
./domain inspect 'https://example.com/docs?q=cpp#api'
./domain resolve example.com

./domain add example.com --root /srv/www/example --https
./domain list
./domain remove example.com
```

Options accepted by `add`:

```text
--root PATH          Required document root
--address IP         Optional IPv4 or IPv6 address
--http-port PORT     HTTP port; default 80
--https-port PORT    HTTPS port; default 443
--https              Enable HTTPS
--no-http            Disable HTTP
--registry FILE      Select another registry file
```

The default registry is `.domains.registry` in the current directory. A save is written to a temporary sibling and renamed into place. Records are tab-separated implementation data; applications should use `DOMAIN_CONTROLLER` instead of editing the file directly.

Exit statuses are `0` for success, `2` for invalid input, `3` for storage errors, `4` for resolver failures, and `5` for conflicts such as a duplicate or missing domain.

## C++ API

Include the aggregate header:

```cpp
#include "domain.hpp"

#include <iostream>

int main()
{
    DOMAIN::DOMAIN_NAME name{"Example.COM."};
    if (!name.Is_Valid()) return 1;

    DOMAIN::URL url;
    if (!DOMAIN::URL::Parse("https://example.com/reference", url)) return 1;

    std::cout << name.Value() << '\n'; // example.com
    std::cout << url.Port << '\n';     // 443
}
```

Persistent registry use:

```cpp
DOMAIN::DOMAIN_CONTROLLER controller{"domains.registry"};
std::string error;

if (!controller.Load(error)) return 1;

DOMAIN::ENTRY entry;
entry.Name = DOMAIN::DOMAIN_NAME{"example.com"};
entry.Root = "/srv/www/example";
entry.HTTPS_Enabled = true;
entry.Created = std::chrono::system_clock::now();

if (!controller.Add(entry, error)) return 1;
if (!controller.Save(error)) return 1;
```

## Components

| Area | Headers | Purpose |
|---|---|---|
| Identity | `domainname.hpp`, `tld.hpp`, `subdomain.hpp`, `subdomainlist.hpp`, `www.hpp` | Domain, suffix, and subdomain value types |
| Addressing | `uri.hpp`, `url.hpp`, `locator.hpp` | URI parsing, HTTP(S) URL parsing, and filesystem location helpers |
| Registry | `entry.hpp`, `domainlist.hpp`, `adddomain.hpp`, `removedomain.hpp`, `domaincontroller.hpp` | Validated entries and persistent add/remove/list operations |
| Resolution | `dns.hpp`, `nameserver.hpp`, `discovery.hpp`, `cache.hpp`, `domaincache.hpp` | OS-backed address resolution and expiring in-memory cache records |
| Web model | `web.hpp`, `virtualhost.hpp`, `http.hpp`, `https.hpp`, `ssl.hpp`, `cookie.hpp`, `api.hpp` | Web-service and virtual-host configuration types |
| Content roots | `htdocs.hpp`, `wwwroot.hpp`, `indexroot.hpp`, `html.hpp`, `css.hpp`, `javascript.hpp` | Document-root and asset descriptors |
| Network model | `dhcp.hpp`, `vpn.hpp`, `domainservice.hpp` | Declarative network/service settings |
| Support | `concurrency.hpp`, `exit.hpp`, `domain.hpp` | Synchronization aliases, exit codes, and aggregate API/version header |

## Validation rules and limits

- Domain names are normalized to lowercase and one terminal dot is removed.
- Domain names must contain at least one dot; each label is limited to 63 characters and the complete name to 253 characters.
- Inputs are ASCII-compatible DNS names. Unicode-to-IDNA conversion is outside this component; pass an already encoded `xn--...` label when needed.
- `URL` accepts `http` and `https` URLs with domain-name hosts. It intentionally rejects user information and bracketed IPv6 literal hosts.
- Ports range from 1 through 65535.
- Registry roots and addresses cannot contain tabs or line breaks.
- `resolve` delegates to `getaddrinfo`, so results follow the host operating system's resolver configuration and network availability.

## Ownership boundary

This package validates intent and stores application state. Deployment belongs in a separate, explicitly privileged layer. In particular, this package does not register public domains; update authoritative DNS; write host or resolver configuration; configure DHCP, VPNs, firewalls, routes, or interfaces; create document roots; install TLS material; or rewrite a web-server configuration.

That boundary keeps the library independently testable and safe to invoke in unprivileged tools.
