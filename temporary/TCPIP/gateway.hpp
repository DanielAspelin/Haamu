#ifndef GATEWAY_HPP
#define GATEWAY_HPP

#include "ip.hpp"

#include <string>

namespace NET {

class GATEWAY {
public:
    IP Address;
    std::string Interface;
    unsigned Metric { 0 };

    bool Is_Valid() const noexcept;
};

} // namespace NET
#endif // GATEWAY_HPP
