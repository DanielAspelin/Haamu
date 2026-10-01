#ifndef UDP_HPP
#define UDP_HPP

#include "client.hpp"
#include "receive.hpp"

#include <string_view>

namespace NET {

class UDP {
public:
    static bool Send(const CLIENT& client, std::string_view data, std::string& error);
    static bool Exchange(const CLIENT& client, std::string_view request,
                         RECEIVE& response, std::size_t maximum = 65536);
};

} // namespace NET
#endif // UDP_HPP
