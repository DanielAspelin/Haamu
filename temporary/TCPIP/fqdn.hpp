#ifndef FQDN_HPP
#define FQDN_HPP

#include <string>
#include <string_view>

namespace NET {

class FQDN {
public:
    FQDN() = default;
    explicit FQDN(std::string value);

    static bool Validate(std::string_view value) noexcept;
    bool Is_Valid() const noexcept;
    const std::string& Value() const noexcept;

private:
    std::string Name;
    bool Valid { false };
};

} // namespace NET
#endif // FQDN_HPP
