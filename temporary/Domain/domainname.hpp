#ifndef DOMAINNAME_HPP
#define DOMAINNAME_HPP
#include <string>
#include <string_view>
namespace DOMAIN {
class DOMAIN_NAME {
public:
    DOMAIN_NAME() = default;
    explicit DOMAIN_NAME(std::string value);
    static bool Validate(std::string_view value) noexcept;
    static std::string Normalize(std::string_view value);
    bool Is_Valid() const noexcept;
    const std::string& Value() const noexcept;
private:
    std::string Name;
    bool Valid { false };
};
}
#endif
