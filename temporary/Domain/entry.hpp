#ifndef ENTRY_HPP
#define ENTRY_HPP
#include "domainname.hpp"
#include <chrono>
#include <cstdint>
#include <string>
namespace DOMAIN {
class ENTRY {
public:
    DOMAIN_NAME Name;
    std::string Root;
    std::string Address;
    std::uint16_t HTTP_Port { 80 };
    std::uint16_t HTTPS_Port { 443 };
    bool HTTP_Enabled { true };
    bool HTTPS_Enabled { false };
    std::chrono::system_clock::time_point Created;
    bool Is_Valid() const noexcept;
};
}
#endif
