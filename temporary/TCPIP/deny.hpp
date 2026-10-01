#ifndef DENY_HPP
#define DENY_HPP

#include "ip.hpp"
#include "port.hpp"

#include <string>

namespace NET {

class DENY {
public:
    IP Address;
    PORT Service_Port;
    std::string Protocol { "any" };

    bool Matches(const IP& address, const PORT& port, const std::string& protocol) const;
};

} // namespace NET
#endif // DENY_HPP
