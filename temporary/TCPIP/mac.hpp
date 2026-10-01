#ifndef MAC_HPP
#define MAC_HPP

#include <array>
#include <cstdint>
#include <string>
#include <string_view>

namespace NET {

class MAC {
public:
    MAC() = default;

    static bool Parse(std::string_view text, MAC& output) noexcept;
    bool Is_Valid() const noexcept;
    bool Is_Multicast() const noexcept;
    bool Is_Locally_Administered() const noexcept;
    std::string String() const;

private:
    std::array<std::uint8_t, 6> Bytes {};
    bool Valid { false };
};

} // namespace NET
#endif // MAC_HPP
