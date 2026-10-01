#ifndef SYMBOLATTRIBUTE_HPP
#define SYMBOLATTRIBUTE_HPP

#include <cstdint>

namespace SYMBOLS {

enum class SYMBOL_ATTRIBUTE : std::uint32_t {
    None        = 0,
    ASCII       = 1U << 0,
    Unicode     = 1U << 1,
    Alphabetic  = 1U << 2,
    Numeric     = 1U << 3,
    Alphanumeric= 1U << 4,
    Whitespace  = 1U << 5,
    Punctuation = 1U << 6,
    Control     = 1U << 7,
    Printable   = 1U << 8,
    Identifier  = 1U << 9,
    Operator    = 1U << 10,
    Delimiter   = 1U << 11,
    Custom      = 1U << 12
};

constexpr SYMBOL_ATTRIBUTE operator|(
    SYMBOL_ATTRIBUTE left,
    SYMBOL_ATTRIBUTE right
) noexcept
{
    return static_cast<SYMBOL_ATTRIBUTE>(
        static_cast<std::uint32_t>(left) |
        static_cast<std::uint32_t>(right)
    );
}

class SYMBOL_ATTRIBUTE_SET {
public:
    constexpr SYMBOL_ATTRIBUTE_SET() noexcept = default;
    constexpr SYMBOL_ATTRIBUTE_SET(SYMBOL_ATTRIBUTE value) noexcept
        : Value(value) {}

    constexpr void Add(SYMBOL_ATTRIBUTE value) noexcept
    {
        Value = Value | value;
    }

    constexpr bool Has(SYMBOL_ATTRIBUTE value) const noexcept
    {
        return (static_cast<std::uint32_t>(Value) &
                static_cast<std::uint32_t>(value)) != 0;
    }

    constexpr SYMBOL_ATTRIBUTE Get() const noexcept { return Value; }

private:
    SYMBOL_ATTRIBUTE Value { SYMBOL_ATTRIBUTE::None };
};

} // namespace SYMBOLS

#endif // SYMBOLATTRIBUTE_HPP
