#ifndef DOMAINSERVICE_HPP
#define DOMAINSERVICE_HPP
#include <cstdint>
#include <string>
namespace DOMAIN {
class DOMAIN_SERVICE {
public:
    std::string Name;
    std::string Protocol { "tcp" };
    std::uint16_t Port { 0 };
    bool Enabled { true };
    bool Is_Valid() const noexcept;
};
}
#endif
