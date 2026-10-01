#ifndef TCP_HPP
#define TCP_HPP

#include "client.hpp"
#include "receive.hpp"
#include "send.hpp"

#include <string_view>

namespace NET {

class TCP {
public:
    static bool Probe(const CLIENT& client, std::string& error);
    static bool Exchange(const CLIENT& client, std::string_view request,
                         RECEIVE& response, std::size_t maximum = 65536);
};

} // namespace NET
#endif // TCP_HPP
