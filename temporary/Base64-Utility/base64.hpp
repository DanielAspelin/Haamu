#ifndef BASE64_HPP
#define BASE64_HPP

#include <cstddef>
#include <cstdint>
#include <string>
#include <string_view>
#include <vector>

namespace CODING {

enum class BASE64_ALPHABET {
    Standard,
    URL_Safe
};

class BASE64_ERROR {
public:
    enum class CODE {
        None,
        Invalid_Character,
        Invalid_Length,
        Invalid_Padding,
        Noncanonical_Trailing_Bits
    };

    CODE Code { CODE::None };
    std::size_t Position { 0 };

    constexpr explicit operator bool() const noexcept
    {
        return Code != CODE::None;
    }
};

class BASE64_ENCODE_OPTIONS {
public:
    BASE64_ALPHABET Alphabet { BASE64_ALPHABET::Standard };
    bool Padding { true };
    std::size_t Wrap { 0 };
};

class BASE64_DECODE_OPTIONS {
public:
    BASE64_ALPHABET Alphabet { BASE64_ALPHABET::Standard };
    bool Ignore_Whitespace { false };
    bool Require_Padding { false };
};

class BASE64 {
public:
    static std::string Encode(
        const std::vector<std::uint8_t>& input,
        const BASE64_ENCODE_OPTIONS& options = {}
    );

    static bool Decode(
        std::string_view input,
        std::vector<std::uint8_t>& output,
        BASE64_ERROR& error,
        const BASE64_DECODE_OPTIONS& options = {}
    );

    static std::size_t Encoded_Size(
        std::size_t input_size,
        bool padding = true
    ) noexcept;

    static std::string_view Error_Name(BASE64_ERROR::CODE code) noexcept;
};

} // namespace CODING

#endif // BASE64_HPP
