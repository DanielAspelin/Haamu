#ifndef UTF32_HPP
#define UTF32_HPP

#include "utf.hpp"

#include <string>
#include <string_view>

namespace UTF {

class UTF32 {
public:
    inline static constexpr std::size_t Units_Per_Scalar = 1;
    inline static constexpr char32_t BOM = 0x0000FEFF;

    static bool Decode(
        std::u32string_view input,
        std::u32string& output,
        ERROR& error
    );

    static bool Encode(
        std::u32string_view input,
        std::u32string& output,
        ERROR& error
    );

    static bool Validate(std::u32string_view input, ERROR& error);
};

} // namespace UTF

#endif // UTF32_HPP
