#include "ascii.hpp"

#include <charconv>
#include <iomanip>
#include <iostream>
#include <string>
#include <string_view>
#include <system_error>

namespace {

constexpr std::string_view Version = "1.0.0";

std::string_view type_name(ASCII::SPECIFIER::TYPE type) noexcept
{
    using TYPE = ASCII::SPECIFIER::TYPE;

    switch (type) {
        case TYPE::Invalid:      return "invalid";
        case TYPE::Control:      return "control";
        case TYPE::Whitespace:   return "whitespace";
        case TYPE::Digit:        return "digit";
        case TYPE::Uppercase:    return "uppercase";
        case TYPE::Lowercase:    return "lowercase";
        case TYPE::Alphabetic:   return "alphabetic";
        case TYPE::Alphanumeric: return "alphanumeric";
        case TYPE::Punctuation:  return "punctuation";
        case TYPE::Symbol:       return "symbol";
        case TYPE::Printable:    return "printable";
    }

    return "invalid";
}

std::string_view control_name(int value) noexcept
{
    static constexpr std::string_view Names[] = {
        "NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL",
        "BS",  "HT",  "LF",  "VT",  "FF",  "CR",  "SO",  "SI",
        "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB",
        "CAN", "EM",  "SUB", "ESC", "FS",  "GS",  "RS",  "US"
    };

    if (value >= 0 && value <= 31) {
        return Names[value];
    }
    if (value == 127) {
        return "DEL";
    }
    return {};
}

std::string display_character(int value)
{
    switch (value) {
        case 0:  return "\\0";
        case 7:  return "\\a";
        case 8:  return "\\b";
        case 9:  return "\\t";
        case 10: return "\\n";
        case 11: return "\\v";
        case 12: return "\\f";
        case 13: return "\\r";
        case 27: return "\\e";
        case 127:return "DEL";
        default: break;
    }

    if (ASCII::CLASSIFIER::Is_Printable(value)) {
        return std::string(1, static_cast<char>(value));
    }

    const std::string_view name = control_name(value);
    return name.empty() ? "?" : std::string(name);
}

bool parse_ascii_value(std::string_view input, int& value) noexcept
{
    if (input.size() == 1 &&
        (input.front() < '0' || input.front() > '9')) {
        value = static_cast<unsigned char>(input.front());
        return ASCII::CLASSIFIER::Is_ASCII(value);
    }

    int parsed = 0;
    const char* begin = input.data();
    const char* end = begin + input.size();
    const auto result = std::from_chars(begin, end, parsed);

    if (result.ec != std::errc{} || result.ptr != end ||
        !ASCII::CLASSIFIER::Is_ASCII(parsed)) {
        return false;
    }

    value = parsed;
    return true;
}

void print_help(std::ostream& output)
{
    output
        << "ascii " << Version << " - ASCII inspection utility\n\n"
        << "Usage:\n"
        << "  ascii inspect <character|code>\n"
        << "  ascii classify <character|code>\n"
        << "  ascii encode <text>\n"
        << "  ascii decode <code> [code ...]\n"
        << "  ascii table [all|printable|control]\n"
        << "  ascii --help\n"
        << "  ascii --version\n\n"
        << "Examples:\n"
        << "  ascii inspect A\n"
        << "  ascii inspect 65\n"
        << "  ascii encode \"ASCII text\"\n"
        << "  ascii decode 65 83 67 73 73\n";
}

void print_record(int value)
{
    const auto character = static_cast<char>(value);

    std::cout
        << "Decimal:    " << value << '\n'
        << "Hexadecimal: 0x" << std::uppercase << std::hex
        << std::setw(2) << std::setfill('0') << value << std::dec << '\n'
        << "Character:   " << display_character(value) << '\n'
        << "Type:        "
        << type_name(ASCII::CLASSIFIER::Classify(character)) << '\n'
        << "Printable:   "
        << (ASCII::CLASSIFIER::Is_Printable(value) ? "yes" : "no") << '\n';

    const std::string_view name = control_name(value);
    if (!name.empty()) {
        std::cout << "Control name:" << ' ' << name << '\n';
    }
}

int inspect(std::string_view argument)
{
    int value = 0;
    if (!parse_ascii_value(argument, value)) {
        std::cerr << "ascii: expected one ASCII character or a code from 0 to 127\n";
        return 2;
    }

    print_record(value);
    return 0;
}

int classify(std::string_view argument)
{
    int value = 0;
    if (!parse_ascii_value(argument, value)) {
        std::cerr << "ascii: expected one ASCII character or a code from 0 to 127\n";
        return 2;
    }

    std::cout << type_name(
        ASCII::CLASSIFIER::Classify(static_cast<char>(value))
    ) << '\n';
    return 0;
}

int encode(std::string_view text)
{
    for (std::size_t index = 0; index < text.size(); ++index) {
        const int value = static_cast<unsigned char>(text[index]);
        if (!ASCII::CLASSIFIER::Is_ASCII(value)) {
            std::cerr << "ascii: input contains a non-ASCII byte at position "
                         << index << '\n';
            return 2;
        }

        if (index != 0) {
            std::cout << ' ';
        }
        std::cout << value;
    }
    std::cout << '\n';
    return 0;
}

int decode(int argument_count, char* arguments[])
{
    for (int index = 2; index < argument_count; ++index) {
        int value = 0;
        if (!parse_ascii_value(arguments[index], value)) {
            std::cerr << "ascii: invalid ASCII code: " << arguments[index] << '\n';
            return 2;
        }
        std::cout << static_cast<char>(value);
    }
    std::cout << '\n';
    return 0;
}

int table(std::string_view mode)
{
    if (mode != "all" && mode != "printable" && mode != "control") {
        std::cerr << "ascii: table mode must be all, printable, or control\n";
        return 2;
    }

    std::cout << "DEC  HEX   CHAR  TYPE\n";
    std::cout << "---  ----  ----  -----------\n";

    for (int value = ASCII::REFERENTIAL::Minimum;
         value <= ASCII::REFERENTIAL::Maximum;
         ++value) {
        const bool printable = ASCII::CLASSIFIER::Is_Printable(value);
        const bool control = ASCII::CLASSIFIER::Is_Control(value);

        if ((mode == "printable" && !printable) ||
            (mode == "control" && !control)) {
            continue;
        }

        std::cout
            << std::right << std::setw(3) << std::setfill(' ') << value
            << "  0x" << std::uppercase << std::hex
            << std::setw(2) << std::setfill('0') << value << std::dec
            << "  " << std::left << std::setw(4) << std::setfill(' ')
            << display_character(value)
            << "  " << type_name(ASCII::CLASSIFIER::Classify(
                static_cast<char>(value))) << '\n';
    }

    return 0;
}

} // namespace

int main(int argument_count, char* arguments[])
{
    if (argument_count == 1) {
        print_help(std::cout);
        return 0;
    }

    const std::string_view command = arguments[1];

    if (command == "--help" || command == "-h" || command == "help") {
        print_help(std::cout);
        return 0;
    }
    if (command == "--version" || command == "-v") {
        std::cout << "ascii " << Version << '\n';
        return 0;
    }
    if (command == "inspect" && argument_count == 3) {
        return inspect(arguments[2]);
    }
    if (command == "classify" && argument_count == 3) {
        return classify(arguments[2]);
    }
    if (command == "encode" && argument_count == 3) {
        return encode(arguments[2]);
    }
    if (command == "decode" && argument_count >= 3) {
        return decode(argument_count, arguments);
    }
    if (command == "table") {
        return table(argument_count == 3 ? arguments[2] : "all");
    }

    std::cerr << "ascii: invalid command or argument count\n"
              << "Try 'ascii --help' for usage.\n";
    return 2;
}