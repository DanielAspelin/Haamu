#ifndef SUBDOMAIN_HPP
#define SUBDOMAIN_HPP
#include <string>
#include <string_view>
namespace DOMAIN {
class SUBDOMAIN {
public:
    SUBDOMAIN() = default;
    explicit SUBDOMAIN(std::string value);
    static bool Validate(std::string_view value) noexcept;
    bool Is_Valid() const noexcept;
    const std::string& Value() const noexcept;
private:
    std::string Name;
    bool Valid { false };
};
}
#endif
