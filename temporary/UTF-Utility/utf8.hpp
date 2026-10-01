#ifndef UTF8_HPP
#define UTF8_HPP

#include "utf.hpp"

#include <string>
#include <string_view>

namespace UTF {

class UTF8 {
public:
    inline static constexpr std::size_t Maximum_Units_Per_Scalar = 4;
    inline static constexpr unsigned char BOM_1 = 0xEF;
    inline static constexpr unsigned char BOM_2 = 0xBB;
    inline static constexpr unsigned char BOM_3 = 0xBF;

    static bool Decode(
        std::string_view input,
        std::u32string& output,
        ERROR& error
    );

    static bool Encode(
        std::u32string_view input,
        std::string& output,
        ERROR& error
    );

    static bool Validate(std::string_view input, ERROR& error);
    static std::size_t Unit_Count(CODE_POINT value) noexcept;
};

} // namespace UTF

#endif // UTF8_HPP
