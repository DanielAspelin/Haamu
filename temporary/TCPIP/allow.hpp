#ifndef ALLOW_HPP
#define ALLOW_HPP

#include "ip.hpp"
#include "port.hpp"

#include <string>

namespace NET {

class ALLOW {
public:
    IP Address;
    PORT Service_Port;
    std::string Protocol { "any" };

    bool Matches(const IP& address, const PORT& port, const std::string& protocol) const;
};

} // namespace NET
#endif // ALLOW_HPP
