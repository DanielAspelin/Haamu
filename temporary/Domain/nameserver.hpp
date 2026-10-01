#ifndef NAMESERVER_HPP
#define NAMESERVER_HPP
#include <string>
namespace DOMAIN {
class NAMESERVER {
public:
    std::string Name;
    std::string Address;
    unsigned Priority { 0 };
    bool Is_Valid() const noexcept;
};
}
#endif
