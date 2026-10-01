#include "utf.hpp"
#include "utf8.hpp"
#include "utf16.hpp"
#include "utf32.hpp"

#include <charconv>
#include <iomanip>
#include <iostream>
#include <string>
#include <string_view>
#include <system_error>

namespace UTF {

std::string_view Error_Name(ERROR::CODE code) noexcept
{
    switch (code) {
        case ERROR::CODE::None:                      return "none";
        case ERROR::CODE::Invalid_Argument:          return "invalid argument";
        case ERROR::CODE::Invalid_Lead_Unit:         return "invalid lead unit";
        case ERROR::CODE::Invalid_Continuation_Unit: return "invalid continuation unit";
        case ERROR::CODE::Truncated_Sequence:        return "truncated sequence";
        case ERROR::CODE::Overlong_Sequence:         return "overlong sequence";
        case ERROR::CODE::Isolated_Surrogate:        return "isolated surrogate";
        case ERROR::CODE::Invalid_Scalar:            return "invalid scalar";
        case ERROR::CODE::Out_Of_Range:              return "out of range";
    }
    return "unknown error";
}

std::string_view Encoding_Name(ENCODING encoding) noexcept
{
    switch (encoding) {
        case ENCODING::UTF8:  return "UTF-8";
        case ENCODING::UTF16: return "UTF-16";
        case ENCODING::UTF32: return "UTF-32";
    }
    return "unknown";
}

std::size_t UTF8::Unit_Count(CODE_POINT value) noexcept
{
    if (!UNICODE::Is_Scalar(value)) return 0;
    if (value <= 0x7F) return 1;
    if (value <= 0x7FF) return 2;
    if (value <= 0xFFFF) return 3;
    return 4;
}

bool UTF8::Decode(std::string_view input, std::u32string& output, ERROR& error)
{
    output.clear();
    error = {};

    for (std::size_t index = 0; index < input.size();) {
        const auto lead = static_cast<unsigned char>(input[index]);
        CODE_POINT scalar = 0;
        std::size_t length = 0;

        if (lead <= 0x7F) {
            scalar = lead;
            length = 1;
        } else if (lead >= 0xC2 && lead <= 0xDF) {
            scalar = lead & 0x1F;
            length = 2;
        } else if (lead >= 0xE0 && lead <= 0xEF) {
            scalar = lead & 0x0F;
            length = 3;
        } else if (lead >= 0xF0 && lead <= 0xF4) {
            scalar = lead & 0x07;
            length = 4;
        } else {
            error = { ERROR::CODE::Invalid_Lead_Unit, index };
            return false;
        }

        if (index + length > input.size()) {
            error = { ERROR::CODE::Truncated_Sequence, index };
            return false;
        }

        for (std::size_t offset = 1; offset < length; ++offset) {
            const auto unit = static_cast<unsigned char>(input[index + offset]);
            if ((unit & 0xC0) != 0x80) {
                error = {
                    ERROR::CODE::Invalid_Continuation_Unit,
                    index + offset
                };
                return false;
            }
            scalar = static_cast<CODE_POINT>((scalar << 6) | (unit & 0x3F));
        }

        const bool overlong =
            (length == 2 && scalar < 0x80) ||
            (length == 3 && scalar < 0x800) ||
            (length == 4 && scalar < 0x10000);

        if (overlong) {
            error = { ERROR::CODE::Overlong_Sequence, index };
            return false;
        }
        if (UNICODE::Is_Surrogate(scalar)) {
            error = { ERROR::CODE::Isolated_Surrogate, index };
            return false;
        }
        if (!UNICODE::Is_Scalar(scalar)) {
            error = { ERROR::CODE::Out_Of_Range, index };
            return false;
        }

        output.push_back(scalar);
        index += length;
    }

    return true;
}

bool UTF8::Encode(std::u32string_view input, std::string& output, ERROR& error)
{
    output.clear();
    error = {};

    for (std::size_t index = 0; index < input.size(); ++index) {
        const CODE_POINT scalar = input[index];
        if (!UNICODE::Is_Scalar(scalar)) {
            error = {
                UNICODE::Is_Surrogate(scalar)
                    ? ERROR::CODE::Isolated_Surrogate
                    : ERROR::CODE::Out_Of_Range,
                index
            };
            return false;
        }

        if (scalar <= 0x7F) {
            output.push_back(static_cast<char>(scalar));
        } else if (scalar <= 0x7FF) {
            output.push_back(static_cast<char>(0xC0 | (scalar >> 6)));
            output.push_back(static_cast<char>(0x80 | (scalar & 0x3F)));
        } else if (scalar <= 0xFFFF) {
            output.push_back(static_cast<char>(0xE0 | (scalar >> 12)));
            output.push_back(static_cast<char>(0x80 | ((scalar >> 6) & 0x3F)));
            output.push_back(static_cast<char>(0x80 | (scalar & 0x3F)));
        } else {
            output.push_back(static_cast<char>(0xF0 | (scalar >> 18)));
            output.push_back(static_cast<char>(0x80 | ((scalar >> 12) & 0x3F)));
            output.push_back(static_cast<char>(0x80 | ((scalar >> 6) & 0x3F)));
            output.push_back(static_cast<char>(0x80 | (scalar & 0x3F)));
        }
    }

    return true;
}

bool UTF8::Validate(std::string_view input, ERROR& error)
{
    std::u32string decoded;
    return Decode(input, decoded, error);
}

std::size_t UTF16::Unit_Count(CODE_POINT value) noexcept
{
    if (!UNICODE::Is_Scalar(value)) return 0;
    return value <= 0xFFFF ? 1 : 2;
}

bool UTF16::Decode(
    std::u16string_view input,
    std::u32string& output,
    ERROR& error
)
{
    output.clear();
    error = {};

    for (std::size_t index = 0; index < input.size(); ++index) {
        const char16_t first = input[index];

        if (first >= High_Surrogate_Begin && first <= High_Surrogate_End) {
            if (index + 1 >= input.size()) {
                error = { ERROR::CODE::Truncated_Sequence, index };
                return false;
            }

            const char16_t second = input[index + 1];
            if (second < Low_Surrogate_Begin || second > Low_Surrogate_End) {
                error = { ERROR::CODE::Isolated_Surrogate, index + 1 };
                return false;
            }

            const CODE_POINT high = first - High_Surrogate_Begin;
            const CODE_POINT low = second - Low_Surrogate_Begin;
            output.push_back(static_cast<CODE_POINT>(
                0x10000 + ((high << 10) | low)
            ));
            ++index;
        } else if (first >= Low_Surrogate_Begin && first <= Low_Surrogate_End) {
            error = { ERROR::CODE::Isolated_Surrogate, index };
            return false;
        } else {
            output.push_back(static_cast<CODE_POINT>(first));
        }
    }

    return true;
}

bool UTF16::Encode(
    std::u32string_view input,
    std::u16string& output,
    ERROR& error
)
{
    output.clear();
    error = {};

    for (std::size_t index = 0; index < input.size(); ++index) {
        CODE_POINT scalar = input[index];
        if (!UNICODE::Is_Scalar(scalar)) {
            error = {
                UNICODE::Is_Surrogate(scalar)
                    ? ERROR::CODE::Isolated_Surrogate
                    : ERROR::CODE::Out_Of_Range,
                index
            };
            return false;
        }

        if (scalar <= 0xFFFF) {
            output.push_back(static_cast<char16_t>(scalar));
        } else {
            scalar -= 0x10000;
            output.push_back(static_cast<char16_t>(
                High_Surrogate_Begin + (scalar >> 10)
            ));
            output.push_back(static_cast<char16_t>(
                Low_Surrogate_Begin + (scalar & 0x3FF)
            ));
        }
    }

    return true;
}

bool UTF16::Validate(std::u16string_view input, ERROR& error)
{
    std::u32string decoded;
    return Decode(input, decoded, error);
}

bool UTF32::Validate(std::u32string_view input, ERROR& error)
{
    error = {};
    for (std::size_t index = 0; index < input.size(); ++index) {
        if (!UNICODE::Is_Scalar(input[index])) {
            error = {
                UNICODE::Is_Surrogate(input[index])
                    ? ERROR::CODE::Isolated_Surrogate
                    : ERROR::CODE::Out_Of_Range,
                index
            };
            return false;
        }
    }
    return true;
}

bool UTF32::Decode(
    std::u32string_view input,
    std::u32string& output,
    ERROR& error
)
{
    if (!Validate(input, error)) {
        output.clear();
        return false;
    }
    output.assign(input.begin(), input.end());
    return true;
}

bool UTF32::Encode(
    std::u32string_view input,
    std::u32string& output,
    ERROR& error
)
{
    return Decode(input, output, error);
}

} // namespace UTF

namespace {

constexpr std::string_view Version = "1.0.0";

void print_help()
{
    std::cout
        << "utf " << Version << " - Unicode transformation utility\n\n"
        << "Usage:\n"
        << "  utf validate utf8 <text>\n"
        << "  utf codepoints <text>\n"
        << "  utf inspect <text>\n"
        << "  utf encode <U+codepoint> [U+codepoint ...]\n"
        << "  utf units <utf8|utf16|utf32> <text>\n"
        << "  utf --help\n"
        << "  utf --version\n\n"
        << "Examples:\n"
        << "  utf codepoints \"Hello\"\n"
        << "  utf encode U+0048 U+0069\n"
        << "  utf units utf16 \"Text\"\n";
}

void print_error(const UTF::ERROR& error)
{
    std::cerr << "utf: " << UTF::Error_Name(error.Code)
              << " at unit " << error.Position << '\n';
}

bool decode_input(std::string_view text, std::u32string& scalars)
{
    UTF::ERROR error;
    if (!UTF::UTF8::Decode(text, scalars, error)) {
        print_error(error);
        return false;
    }
    return true;
}

void print_codepoint(UTF::CODE_POINT scalar)
{
    const auto value = static_cast<std::uint32_t>(scalar);
    std::cout << "U+" << std::uppercase << std::hex << std::setfill('0')
              << std::setw(4) << value << std::dec;
}

bool parse_codepoint(std::string_view text, UTF::CODE_POINT& output)
{
    if (text.size() >= 2 && (text.substr(0, 2) == "U+" ||
                             text.substr(0, 2) == "u+" ||
                             text.substr(0, 2) == "0x" ||
                             text.substr(0, 2) == "0X")) {
        text.remove_prefix(2);
    }
    if (text.empty()) return false;

    std::uint32_t value = 0;
    const auto result = std::from_chars(
        text.data(), text.data() + text.size(), value, 16
    );
    if (result.ec != std::errc{} || result.ptr != text.data() + text.size()) {
        return false;
    }

    output = static_cast<UTF::CODE_POINT>(value);
    return UTF::UNICODE::Is_Scalar(output);
}

int validate(std::string_view encoding, std::string_view text)
{
    if (encoding != "utf8" && encoding != "utf-8") {
        std::cerr << "utf: command-line text input is UTF-8; use validate utf8\n";
        return 2;
    }

    UTF::ERROR error;
    if (!UTF::UTF8::Validate(text, error)) {
        print_error(error);
        return 2;
    }
    std::cout << "valid\n";
    return 0;
}

int codepoints(std::string_view text)
{
    std::u32string scalars;
    if (!decode_input(text, scalars)) return 2;

    for (std::size_t index = 0; index < scalars.size(); ++index) {
        if (index != 0) std::cout << ' ';
        print_codepoint(scalars[index]);
    }
    std::cout << '\n';
    return 0;
}

int inspect(std::string_view text)
{
    std::u32string scalars;
    if (!decode_input(text, scalars)) return 2;

    std::cout << "INDEX  CODEPOINT  UTF8  UTF16  UTF32  ASCII\n";
    for (std::size_t index = 0; index < scalars.size(); ++index) {
        const auto scalar = scalars[index];
        std::cout << std::right << std::setfill(' ') << std::setw(5)
                  << index << "  ";
        print_codepoint(scalar);
        std::cout << "       " << UTF::UTF8::Unit_Count(scalar)
                  << "      " << UTF::UTF16::Unit_Count(scalar)
                  << "      1      "
                  << (UTF::UNICODE::Is_ASCII(scalar) ? "yes" : "no") << '\n';
    }
    return 0;
}

int encode(int argument_count, char* arguments[])
{
    std::u32string scalars;
    for (int index = 2; index < argument_count; ++index) {
        UTF::CODE_POINT scalar = 0;
        if (!parse_codepoint(arguments[index], scalar)) {
            std::cerr << "utf: invalid Unicode scalar: " << arguments[index] << '\n';
            return 2;
        }
        scalars.push_back(scalar);
    }

    std::string output;
    UTF::ERROR error;
    if (!UTF::UTF8::Encode(scalars, output, error)) {
        print_error(error);
        return 2;
    }
    std::cout << output << '\n';
    return 0;
}

template<typename UNIT>
void print_unit(UNIT unit, int width)
{
    std::cout << "0x" << std::uppercase << std::hex << std::setfill('0')
              << std::setw(width)
              << static_cast<std::uint32_t>(unit) << std::dec;
}

int units(std::string_view encoding, std::string_view text)
{
    std::u32string scalars;
    if (!decode_input(text, scalars)) return 2;

    UTF::ERROR error;
    if (encoding == "utf8" || encoding == "utf-8") {
        std::string encoded;
        if (!UTF::UTF8::Encode(scalars, encoded, error)) return 2;
        for (std::size_t index = 0; index < encoded.size(); ++index) {
            if (index != 0) std::cout << ' ';
            print_unit(static_cast<unsigned char>(encoded[index]), 2);
        }
    } else if (encoding == "utf16" || encoding == "utf-16") {
        std::u16string encoded;
        if (!UTF::UTF16::Encode(scalars, encoded, error)) return 2;
        for (std::size_t index = 0; index < encoded.size(); ++index) {
            if (index != 0) std::cout << ' ';
            print_unit(encoded[index], 4);
        }
    } else if (encoding == "utf32" || encoding == "utf-32") {
        for (std::size_t index = 0; index < scalars.size(); ++index) {
            if (index != 0) std::cout << ' ';
            print_unit(scalars[index], 8);
        }
    } else {
        std::cerr << "utf: encoding must be utf8, utf16, or utf32\n";
        return 2;
    }

    std::cout << '\n';
    return 0;
}

} // namespace

int main(int argument_count, char* arguments[])
{
    if (argument_count == 1) {
        print_help();
        return 0;
    }

    const std::string_view command = arguments[1];
    if (command == "--help" || command == "-h" || command == "help") {
        print_help();
        return 0;
    }
    if (command == "--version" || command == "-v") {
        std::cout << "utf " << Version << '\n';
        return 0;
    }
    if (command == "validate" && argument_count == 4) {
        return validate(arguments[2], arguments[3]);
    }
    if (command == "codepoints" && argument_count == 3) {
        return codepoints(arguments[2]);
    }
    if (command == "inspect" && argument_count == 3) {
        return inspect(arguments[2]);
    }
    if (command == "encode" && argument_count >= 3) {
        return encode(argument_count, arguments);
    }
    if (command == "units" && argument_count == 4) {
        return units(arguments[2], arguments[3]);
    }

    std::cerr << "utf: invalid command or argument count\n"
              << "Try 'utf --help' for usage.\n";
    return 2;
}
