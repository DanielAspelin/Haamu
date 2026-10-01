#ifndef HOSTNAME_HPP
#define HOSTNAME_HPP

#include <string>
#include <string_view>

namespace NET {

class HOSTNAME {
public:
    HOSTNAME() = default;
    explicit HOSTNAME(std::string value);

    static bool Validate(std::string_view value) noexcept;
    bool Is_Valid() const noexcept;
    const std::string& Value() const noexcept;

private:
    std::string Name;
    bool Valid { false };
};

} // namespace NET
#endif // HOSTNAME_HPP
