#ifndef TCPIP_HPP
#define TCPIP_HPP

#include "allow.hpp"
#include "client.hpp"
#include "deny.hpp"
#include "firewall.hpp"
#include "fqdn.hpp"
#include "gateway.hpp"
#include "globalhost.hpp"
#include "group.hpp"
#include "host.hpp"
#include "hostname.hpp"
#include "hosts.hpp"
#include "internet.hpp"
#include "ip.hpp"
#include "localhost.hpp"
#include "mac.hpp"
#include "map.hpp"
#include "network.hpp"
#include "port.hpp"
#include "proxy.hpp"
#include "receive.hpp"
#include "route.hpp"
#include "router.hpp"
#include "send.hpp"
#include "server.hpp"
#include "tcp.hpp"
#include "udp.hpp"

#include <string_view>

namespace NET {

class TCPIP {
public:
    inline static constexpr std::string_view Version = "1.0.0";
    inline static constexpr std::string_view Name = "Independent TCP/IP Toolkit";
};

} // namespace NET
#endif // TCPIP_HPP
