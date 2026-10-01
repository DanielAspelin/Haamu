#ifndef PORT_HPP
#define PORT_HPP

#include <cstdint>
#include <string_view>

namespace NET {

class PORT {
public:
    PORT() = default;
    explicit constexpr PORT(std::uint16_t value) noexcept : Value(value), Valid(true) {}

    static bool Parse(std::string_view text, PORT& output) noexcept;
    constexpr bool Is_Valid() const noexcept { return Valid; }
    constexpr std::uint16_t Number() const noexcept { return Value; }
    constexpr bool Is_Privileged() const noexcept { return Valid && Value < 1024; }

private:
    std::uint16_t Value { 0 };
    bool Valid { false };
};

} // namespace NET
#endif // PORT_HPP
