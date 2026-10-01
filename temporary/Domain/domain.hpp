#ifndef DOMAIN_HPP
#define DOMAIN_HPP
#include "adddomain.hpp"
#include "api.hpp"
#include "cache.hpp"
#include "concurrency.hpp"
#include "cookie.hpp"
#include "css.hpp"
#include "dhcp.hpp"
#include "discovery.hpp"
#include "dns.hpp"
#include "domaincache.hpp"
#include "domaincontroller.hpp"
#include "domainlist.hpp"
#include "domainname.hpp"
#include "domainservice.hpp"
#include "entry.hpp"
#include "exit.hpp"
#include "htdocs.hpp"
#include "html.hpp"
#include "http.hpp"
#include "https.hpp"
#include "indexroot.hpp"
#include "javascript.hpp"
#include "locator.hpp"
#include "nameserver.hpp"
#include "removedomain.hpp"
#include "ssl.hpp"
#include "subdomain.hpp"
#include "subdomainlist.hpp"
#include "tld.hpp"
#include "uri.hpp"
#include "url.hpp"
#include "virtualhost.hpp"
#include "vpn.hpp"
#include "web.hpp"
#include "www.hpp"
#include "wwwroot.hpp"
#include <string_view>
namespace DOMAIN {
class DOMAIN {
public:
    inline static constexpr std::string_view Version = "1.0.0";
    inline static constexpr std::string_view Name = "Independent Domain Controller";
};
}
#endif
