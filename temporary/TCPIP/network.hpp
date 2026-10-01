#ifndef NETWORK_HPP
#define NETWORK_HPP

#include "ip.hpp"

#include <string>
#include <vector>

namespace NET {

class NETWORK {
public:
    static std::string Local_Hostname();
    static bool Local_Addresses(std::vector<IP>& addresses, std::string& error);
};

} // namespace NET
#endif // NETWORK_HPP
