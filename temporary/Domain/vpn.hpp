#ifndef VPN_HPP
#define VPN_HPP
#include <string>
namespace DOMAIN {
class VPN {
public:
    std::string Interface;
    std::string Address;
    bool Enabled { false };
    bool Is_Valid() const noexcept;
};
}
#endif
