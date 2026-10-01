#ifndef HOST_HPP
#define HOST_HPP

#include "ip.hpp"
#include "port.hpp"

#include <string>

namespace NET {

class HOST {
public:
    std::string Name;
    IP Address;
    PORT Service_Port;

    bool Is_Valid() const noexcept;
    std::string Endpoint() const;
};

} // namespace NET
#endif // HOST_HPP
