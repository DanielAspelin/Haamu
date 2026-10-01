#ifndef UTF16_HPP
#define UTF16_HPP

#include "utf.hpp"

#include <string>
#include <string_view>

namespace UTF {

class UTF16 {
public:
    inline static constexpr std::size_t Maximum_Units_Per_Scalar = 2;
    inline static constexpr char16_t High_Surrogate_Begin = 0xD800;
    inline static constexpr char16_t High_Surrogate_End = 0xDBFF;
    inline static constexpr char16_t Low_Surrogate_Begin = 0xDC00;
    inline static constexpr char16_t Low_Surrogate_End = 0xDFFF;
    inline static constexpr char16_t BOM = 0xFEFF;

    static bool Decode(
        std::u16string_view input,
        std::u32string& output,
        ERROR& error
    );

    static bool Encode(
        std::u32string_view input,
        std::u16string& output,
        ERROR& error
    );

    static bool Validate(std::u16string_view input, ERROR& error);
    static std::size_t Unit_Count(CODE_POINT value) noexcept;
};

} // namespace UTF

#endif // UTF16_HPP
