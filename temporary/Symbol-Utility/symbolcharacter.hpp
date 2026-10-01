#ifndef SYMBOLCHARACTER_HPP
#define SYMBOLCHARACTER_HPP

#include "symbol.hpp"

#include <string>
#include <string_view>

namespace SYMBOLS {

class SYMBOL_CHARACTER {
public:
    static bool Is_Scalar(SYMBOL_NUMBER value) noexcept;
    static bool Is_ASCII(SYMBOL_NUMBER value) noexcept;
    static bool Is_Control(SYMBOL_NUMBER value) noexcept;
    static bool Is_Whitespace(SYMBOL_NUMBER value) noexcept;
    static bool Is_Alphabetic(SYMBOL_NUMBER value) noexcept;
    static bool Is_Numeric(SYMBOL_NUMBER value) noexcept;
    static bool Is_Printable(SYMBOL_NUMBER value) noexcept;

    static SYMBOL_ATTRIBUTE_SET Classify(SYMBOL_NUMBER value) noexcept;
    static std::string Category(SYMBOL_NUMBER value);

    static bool Encode_UTF8(SYMBOL_NUMBER value, std::string& output);
    static bool Decode_UTF8(
        std::string_view input,
        SYMBOL_NUMBER& value,
        std::size_t& consumed
    ) noexcept;
};

} // namespace SYMBOLS

#endif // SYMBOLCHARACTER_HPP
