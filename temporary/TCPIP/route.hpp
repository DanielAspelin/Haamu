#ifndef ROUTE_HPP
#define ROUTE_HPP

#include "gateway.hpp"
#include "ip.hpp"

#include <cstdint>

namespace NET {

class ROUTE {
public:
    IP Destination;
    std::uint8_t Prefix { 0 };
    GATEWAY Via;

    bool Is_Valid() const noexcept;
};

} // namespace NET
#endif // ROUTE_HPP
