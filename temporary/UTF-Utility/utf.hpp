#ifndef UTF_HPP
#define UTF_HPP

#include <cstddef>
#include <cstdint>
#include <string_view>

namespace UTF {

using CODE_POINT = char32_t;

enum class ENCODING {
    UTF8,
    UTF16,
    UTF32
};

enum class BYTE_ORDER {
    Native,
    Little_Endian,
    Big_Endian
};

class ERROR {
public:
    enum class CODE {
        None,
        Invalid_Argument,
        Invalid_Lead_Unit,
        Invalid_Continuation_Unit,
        Truncated_Sequence,
        Overlong_Sequence,
        Isolated_Surrogate,
        Invalid_Scalar,
        Out_Of_Range
    };

    CODE Code { CODE::None };
    std::size_t Position { 0 };

    constexpr explicit operator bool() const noexcept
    {
        return Code != CODE::None;
    }
};

class UNICODE {
public:
    inline static constexpr CODE_POINT Minimum = 0x000000;
    inline static constexpr CODE_POINT Maximum = 0x10FFFF;
    inline static constexpr CODE_POINT Surrogate_Begin = 0xD800;
    inline static constexpr CODE_POINT Surrogate_End = 0xDFFF;
    inline static constexpr CODE_POINT Replacement = 0xFFFD;

    static constexpr bool Is_Surrogate(CODE_POINT value) noexcept
    {
        return value >= Surrogate_Begin && value <= Surrogate_End;
    }

    static constexpr bool Is_Scalar(CODE_POINT value) noexcept
    {
        return value <= Maximum && !Is_Surrogate(value);
    }

    static constexpr bool Is_ASCII(CODE_POINT value) noexcept
    {
        return value <= 0x7F;
    }
};

std::string_view Error_Name(ERROR::CODE code) noexcept;
std::string_view Encoding_Name(ENCODING encoding) noexcept;

} // namespace UTF

#endif // UTF_HPP
