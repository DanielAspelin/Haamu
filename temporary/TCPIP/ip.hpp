#ifndef IP_HPP
#define IP_HPP

#include <string>
#include <string_view>

namespace NET {

class IP {
public:
    enum class FAMILY { Invalid, IPv4, IPv6 };

    IP() = default;
    explicit IP(std::string address);

    static bool Validate(std::string_view address, FAMILY& family) noexcept;
    bool Is_Valid() const noexcept;
    bool Is_Loopback() const noexcept;
    bool Is_Unspecified() const noexcept;
    const std::string& Address() const noexcept;
    FAMILY Family() const noexcept;

private:
    std::string Value;
    FAMILY Type { FAMILY::Invalid };
};

} // namespace NET
#endif // IP_HPP
