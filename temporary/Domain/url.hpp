#ifndef URL_HPP
#define URL_HPP
#include "domainname.hpp"
#include <cstdint>
#include <string>
#include <string_view>
namespace DOMAIN {
class URL {
public:
    std::string Scheme;
    DOMAIN_NAME Domain;
    std::uint16_t Port { 0 };
    std::string Path { "/" };
    std::string Query;
    std::string Fragment;
    static bool Parse(std::string_view value, URL& output);
    bool Is_Valid() const noexcept;
    std::string String() const;
};
}
#endif
