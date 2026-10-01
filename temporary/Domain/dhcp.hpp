#ifndef DHCP_HPP
#define DHCP_HPP
#include <chrono>
#include <string>
namespace DOMAIN {
class DHCP {
public:
    std::string Address;
    std::string Gateway;
    std::chrono::seconds Lease { 0 };
    bool Enabled { false };
    bool Is_Valid() const noexcept;
};
}
#endif
