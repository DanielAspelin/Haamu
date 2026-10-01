#include "base64.hpp"

#include <charconv>
#include <cctype>
#include <cstdint>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <iterator>
#include <limits>
#include <string>
#include <string_view>
#include <system_error>
#include <vector>

namespace {

constexpr std::string_view Standard_Alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
constexpr std::string_view URL_Alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

int decode_value(char character, CODING::BASE64_ALPHABET alphabet) noexcept
{
    if (character >= 'A' && character <= 'Z') return character - 'A';
    if (character >= 'a' && character <= 'z') return character - 'a' + 26;
    if (character >= '0' && character <= '9') return character - '0' + 52;
    if (alphabet == CODING::BASE64_ALPHABET::Standard) {
        if (character == '+') return 62;
        if (character == '/') return 63;
    } else {
        if (character == '-') return 62;
        if (character == '_') return 63;
    }
    return -1;
}

bool whitespace(char character) noexcept
{
    const auto value = static_cast<unsigned char>(character);
    return std::isspace(value) != 0;
}

} // namespace

namespace CODING {

std::size_t BASE64::Encoded_Size(std::size_t input_size, bool padding) noexcept
{
    if (input_size > (std::numeric_limits<std::size_t>::max() - 2) / 4 * 3) {
        return 0;
    }
    if (padding) return ((input_size + 2) / 3) * 4;
    const std::size_t complete = (input_size / 3) * 4;
    const std::size_t remainder = input_size % 3;
    return complete + (remainder == 0 ? 0 : remainder + 1);
}

std::string BASE64::Encode(
    const std::vector<std::uint8_t>& input,
    const BASE64_ENCODE_OPTIONS& options
)
{
    const std::string_view alphabet = options.Alphabet == BASE64_ALPHABET::Standard
        ? Standard_Alphabet
        : URL_Alphabet;

    std::string unwrapped;
    unwrapped.reserve(Encoded_Size(input.size(), options.Padding));

    for (std::size_t index = 0; index < input.size(); index += 3) {
        const std::uint32_t first = input[index];
        const bool second_present = index + 1 < input.size();
        const bool third_present = index + 2 < input.size();
        const std::uint32_t second = second_present ? input[index + 1] : 0;
        const std::uint32_t third = third_present ? input[index + 2] : 0;
        const std::uint32_t value = (first << 16) | (second << 8) | third;

        unwrapped.push_back(alphabet[(value >> 18) & 0x3F]);
        unwrapped.push_back(alphabet[(value >> 12) & 0x3F]);
        if (second_present) unwrapped.push_back(alphabet[(value >> 6) & 0x3F]);
        else if (options.Padding) unwrapped.push_back('=');
        if (third_present) unwrapped.push_back(alphabet[value & 0x3F]);
        else if (options.Padding) unwrapped.push_back('=');
    }

    if (options.Wrap == 0 || unwrapped.size() <= options.Wrap) return unwrapped;

    std::string wrapped;
    wrapped.reserve(unwrapped.size() + unwrapped.size() / options.Wrap);
    for (std::size_t index = 0; index < unwrapped.size(); ++index) {
        if (index != 0 && index % options.Wrap == 0) wrapped.push_back('\n');
        wrapped.push_back(unwrapped[index]);
    }
    return wrapped;
}

bool BASE64::Decode(
    std::string_view input,
    std::vector<std::uint8_t>& output,
    BASE64_ERROR& error,
    const BASE64_DECODE_OPTIONS& options
)
{
    output.clear();
    error = {};

    std::string normalized;
    normalized.reserve(input.size());
    for (std::size_t index = 0; index < input.size(); ++index) {
        if (whitespace(input[index])) {
            if (options.Ignore_Whitespace) continue;
            error = { BASE64_ERROR::CODE::Invalid_Character, index };
            return false;
        }
        normalized.push_back(input[index]);
    }

    if (normalized.empty()) return true;

    const std::size_t first_padding = normalized.find('=');
    const std::size_t data_size = first_padding == std::string::npos
        ? normalized.size()
        : first_padding;
    const std::size_t padding = normalized.size() - data_size;

    if (padding > 2) {
        error = { BASE64_ERROR::CODE::Invalid_Padding, data_size };
        return false;
    }
    if (first_padding != std::string::npos) {
        for (std::size_t index = first_padding; index < normalized.size(); ++index) {
            if (normalized[index] != '=') {
                error = { BASE64_ERROR::CODE::Invalid_Padding, index };
                return false;
            }
        }
        if (normalized.size() % 4 != 0 ||
            (padding == 1 && data_size % 4 != 3) ||
            (padding == 2 && data_size % 4 != 2)) {
            error = { BASE64_ERROR::CODE::Invalid_Padding, data_size };
            return false;
        }
    }

    if (data_size % 4 == 1) {
        error = { BASE64_ERROR::CODE::Invalid_Length, data_size };
        return false;
    }
    if (options.Require_Padding && normalized.size() % 4 != 0) {
        error = { BASE64_ERROR::CODE::Invalid_Padding, data_size };
        return false;
    }

    std::uint32_t accumulator = 0;
    unsigned bits = 0;
    int final_value = 0;
    for (std::size_t index = 0; index < data_size; ++index) {
        const int value = decode_value(normalized[index], options.Alphabet);
        if (value < 0) {
            error = { BASE64_ERROR::CODE::Invalid_Character, index };
            output.clear();
            return false;
        }
        final_value = value;
        accumulator = (accumulator << 6) | static_cast<std::uint32_t>(value);
        bits += 6;
        if (bits >= 8) {
            bits -= 8;
            output.push_back(static_cast<std::uint8_t>((accumulator >> bits) & 0xFF));
        }
    }

    if ((data_size % 4 == 2 && (final_value & 0x0F) != 0) ||
        (data_size % 4 == 3 && (final_value & 0x03) != 0)) {
        error = {
            BASE64_ERROR::CODE::Noncanonical_Trailing_Bits,
            data_size - 1
        };
        output.clear();
        return false;
    }
    return true;
}

std::string_view BASE64::Error_Name(BASE64_ERROR::CODE code) noexcept
{
    switch (code) {
        case BASE64_ERROR::CODE::None:                       return "none";
        case BASE64_ERROR::CODE::Invalid_Character:          return "invalid character";
        case BASE64_ERROR::CODE::Invalid_Length:             return "invalid encoded length";
        case BASE64_ERROR::CODE::Invalid_Padding:            return "invalid padding";
        case BASE64_ERROR::CODE::Noncanonical_Trailing_Bits: return "noncanonical trailing bits";
    }
    return "unknown error";
}

} // namespace CODING

namespace {

constexpr std::string_view Version = "1.0.0";

struct CLI_OPTIONS {
    bool Encode { false };
    bool Decode { false };
    bool Text_Set { false };
    std::string Text;
    std::filesystem::path Input;
    std::filesystem::path Output;
    CODING::BASE64_ALPHABET Alphabet { CODING::BASE64_ALPHABET::Standard };
    bool Padding { true };
    bool Ignore_Whitespace { false };
    bool Require_Padding { false };
    std::size_t Wrap { 0 };
};

void help()
{
    std::cout
        << "base64 " << Version << " - binary-safe Base64 codec\n\n"
        << "Usage:\n"
        << "  base64 encode [options]\n"
        << "  base64 decode [options]\n\n"
        << "Input and output:\n"
        << "  --text TEXT             Use literal argument input\n"
        << "  --input FILE            Read input from FILE\n"
        << "  --output FILE           Write output to FILE\n"
        << "  Standard input/output are used when paths are omitted\n\n"
        << "Encoding:\n"
        << "  --url-safe              Use the RFC 4648 URL-safe alphabet\n"
        << "  --no-padding            Omit '=' encoding padding\n"
        << "  --wrap COLUMNS          Wrap encoded output\n\n"
        << "Decoding:\n"
        << "  --ignore-whitespace     Ignore ASCII whitespace\n"
        << "  --require-padding       Require a complete padded quantum\n\n"
        << "  --help, -h              Show help\n"
        << "  --version, -v           Show version\n";
}

bool parse_size(std::string_view text, std::size_t& output)
{
    std::size_t value = 0;
    const auto result = std::from_chars(
        text.data(), text.data() + text.size(), value
    );
    if (result.ec != std::errc{} || result.ptr != text.data() + text.size()) {
        return false;
    }
    output = value;
    return true;
}

bool parse_options(int count, char* arguments[], CLI_OPTIONS& options)
{
    if (count < 2) return false;
    const std::string_view operation = arguments[1];
    if (operation == "encode") options.Encode = true;
    else if (operation == "decode") options.Decode = true;
    else return false;

    for (int index = 2; index < count; ++index) {
        const std::string_view argument = arguments[index];
        if (argument == "--text") {
            if (++index >= count || !options.Input.empty() || options.Text_Set) {
                std::cerr << "base64: invalid or duplicate text input\n"; return false;
            }
            options.Text = arguments[index];
            options.Text_Set = true;
        } else if (argument == "--input") {
            if (++index >= count || options.Text_Set || !options.Input.empty()) {
                std::cerr << "base64: invalid or duplicate file input\n"; return false;
            }
            options.Input = arguments[index];
        } else if (argument == "--output") {
            if (++index >= count || !options.Output.empty()) {
                std::cerr << "base64: invalid or duplicate output path\n"; return false;
            }
            options.Output = arguments[index];
        } else if (argument == "--url-safe") {
            options.Alphabet = CODING::BASE64_ALPHABET::URL_Safe;
        } else if (argument == "--no-padding" && options.Encode) {
            options.Padding = false;
        } else if (argument == "--ignore-whitespace" && options.Decode) {
            options.Ignore_Whitespace = true;
        } else if (argument == "--require-padding" && options.Decode) {
            options.Require_Padding = true;
        } else if (argument == "--wrap" && options.Encode) {
            if (++index >= count || !parse_size(arguments[index], options.Wrap) ||
                options.Wrap == 0) {
                std::cerr << "base64: wrap width must be a positive integer\n";
                return false;
            }
        } else {
            std::cerr << "base64: invalid option for this operation: "
                      << argument << '\n';
            return false;
        }
    }
    return true;
}

bool read_file(const std::filesystem::path& path, std::vector<std::uint8_t>& data)
{
    std::ifstream stream(path, std::ios::binary);
    if (!stream) return false;
    data.assign(std::istreambuf_iterator<char>(stream), {});
    return stream.good() || stream.eof();
}

bool read_input(const CLI_OPTIONS& options, std::vector<std::uint8_t>& data)
{
    if (options.Text_Set) {
        data.assign(options.Text.begin(), options.Text.end());
        return true;
    }
    if (!options.Input.empty()) return read_file(options.Input, data);
    data.assign(std::istreambuf_iterator<char>(std::cin), {});
    return std::cin.good() || std::cin.eof();
}

bool write_output(
    const std::filesystem::path& path,
    const std::vector<std::uint8_t>& data
)
{
    if (path.empty()) {
        std::cout.write(reinterpret_cast<const char*>(data.data()),
                        static_cast<std::streamsize>(data.size()));
        return static_cast<bool>(std::cout);
    }
    std::ofstream stream(path, std::ios::binary | std::ios::trunc);
    if (!stream) return false;
    stream.write(reinterpret_cast<const char*>(data.data()),
                 static_cast<std::streamsize>(data.size()));
    return static_cast<bool>(stream);
}

} // namespace

int main(int argument_count, char* arguments[])
{
    if (argument_count == 1) { help(); return 0; }
    const std::string_view first = arguments[1];
    if (first == "--help" || first == "-h" || first == "help") {
        help(); return 0;
    }
    if (first == "--version" || first == "-v") {
        std::cout << "base64 " << Version << '\n'; return 0;
    }

    CLI_OPTIONS options;
    if (!parse_options(argument_count, arguments, options)) {
        std::cerr << "Try 'base64 --help' for usage.\n"; return 2;
    }

    std::vector<std::uint8_t> input;
    if (!read_input(options, input)) {
        std::cerr << "base64: could not read input\n"; return 3;
    }

    if (options.Encode) {
        CODING::BASE64_ENCODE_OPTIONS encode_options;
        encode_options.Alphabet = options.Alphabet;
        encode_options.Padding = options.Padding;
        encode_options.Wrap = options.Wrap;
        const std::string encoded = CODING::BASE64::Encode(input, encode_options);
        const std::vector<std::uint8_t> output(encoded.begin(), encoded.end());
        if (!write_output(options.Output, output)) {
            std::cerr << "base64: could not write output\n"; return 3;
        }
        if (options.Output.empty()) std::cout << '\n';
        return 0;
    }

    CODING::BASE64_DECODE_OPTIONS decode_options;
    decode_options.Alphabet = options.Alphabet;
    decode_options.Ignore_Whitespace = options.Ignore_Whitespace;
    decode_options.Require_Padding = options.Require_Padding;
    std::vector<std::uint8_t> output;
    CODING::BASE64_ERROR error;
    const std::string encoded(input.begin(), input.end());
    if (!CODING::BASE64::Decode(encoded, output, error, decode_options)) {
        std::cerr << "base64: " << CODING::BASE64::Error_Name(error.Code)
                  << " at input position " << error.Position << '\n';
        return 2;
    }
    if (!write_output(options.Output, output)) {
        std::cerr << "base64: could not write output\n"; return 3;
    }
    return 0;
}
