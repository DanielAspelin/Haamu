#include "symbol.hpp"
#include "metasymbol.hpp"
#include "newsymbol.hpp"
#include "symbolattribute.hpp"
#include "symbolcharacter.hpp"
#include "symbolescape.hpp"
#include "symbolnumber.hpp"
#include "symboltable.hpp"

#include <algorithm>
#include <charconv>
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <string>
#include <string_view>
#include <system_error>
#include <utility>

namespace SYMBOLS {

bool SYMBOL::Is_Valid() const noexcept
{
    return !Name.empty() && SYMBOL_CHARACTER::Is_Scalar(Number) &&
           !Character.empty();
}

bool SYMBOL_CHARACTER::Is_Scalar(SYMBOL_NUMBER value) noexcept
{
    return value <= 0x10FFFF && !(value >= 0xD800 && value <= 0xDFFF);
}

bool SYMBOL_CHARACTER::Is_ASCII(SYMBOL_NUMBER value) noexcept
{
    return value <= 0x7F;
}

bool SYMBOL_CHARACTER::Is_Control(SYMBOL_NUMBER value) noexcept
{
    return value <= 0x1F || (value >= 0x7F && value <= 0x9F);
}

bool SYMBOL_CHARACTER::Is_Whitespace(SYMBOL_NUMBER value) noexcept
{
    return value == U' ' || value == U'\t' || value == U'\n' ||
           value == U'\r' || value == U'\f' || value == U'\v';
}

bool SYMBOL_CHARACTER::Is_Alphabetic(SYMBOL_NUMBER value) noexcept
{
    return (value >= U'A' && value <= U'Z') ||
           (value >= U'a' && value <= U'z');
}

bool SYMBOL_CHARACTER::Is_Numeric(SYMBOL_NUMBER value) noexcept
{
    return value >= U'0' && value <= U'9';
}

bool SYMBOL_CHARACTER::Is_Printable(SYMBOL_NUMBER value) noexcept
{
    return Is_Scalar(value) && !Is_Control(value);
}

SYMBOL_ATTRIBUTE_SET SYMBOL_CHARACTER::Classify(SYMBOL_NUMBER value) noexcept
{
    SYMBOL_ATTRIBUTE_SET attributes;
    if (!Is_Scalar(value)) return attributes;

    attributes.Add(SYMBOL_ATTRIBUTE::Unicode);
    if (Is_ASCII(value)) attributes.Add(SYMBOL_ATTRIBUTE::ASCII);
    if (Is_Alphabetic(value)) {
        attributes.Add(SYMBOL_ATTRIBUTE::Alphabetic);
        attributes.Add(SYMBOL_ATTRIBUTE::Alphanumeric);
        attributes.Add(SYMBOL_ATTRIBUTE::Identifier);
    }
    if (Is_Numeric(value)) {
        attributes.Add(SYMBOL_ATTRIBUTE::Numeric);
        attributes.Add(SYMBOL_ATTRIBUTE::Alphanumeric);
    }
    if (Is_Whitespace(value)) attributes.Add(SYMBOL_ATTRIBUTE::Whitespace);
    if (Is_Control(value)) attributes.Add(SYMBOL_ATTRIBUTE::Control);
    if (Is_Printable(value)) attributes.Add(SYMBOL_ATTRIBUTE::Printable);
    if (Is_ASCII(value) && Is_Printable(value) &&
        !Is_Alphabetic(value) && !Is_Numeric(value) && !Is_Whitespace(value)) {
        attributes.Add(SYMBOL_ATTRIBUTE::Punctuation);
    }
    return attributes;
}

std::string SYMBOL_CHARACTER::Category(SYMBOL_NUMBER value)
{
    if (!Is_Scalar(value)) return "invalid";
    if (Is_Control(value)) return "control";
    if (Is_Whitespace(value)) return "whitespace";
    if (Is_Alphabetic(value)) return "alphabetic";
    if (Is_Numeric(value)) return "numeric";
    if (Is_ASCII(value)) return "punctuation";
    return "unicode-symbol";
}

bool SYMBOL_CHARACTER::Encode_UTF8(SYMBOL_NUMBER value, std::string& output)
{
    output.clear();
    if (!Is_Scalar(value)) return false;

    if (value <= 0x7F) {
        output.push_back(static_cast<char>(value));
    } else if (value <= 0x7FF) {
        output.push_back(static_cast<char>(0xC0 | (value >> 6)));
        output.push_back(static_cast<char>(0x80 | (value & 0x3F)));
    } else if (value <= 0xFFFF) {
        output.push_back(static_cast<char>(0xE0 | (value >> 12)));
        output.push_back(static_cast<char>(0x80 | ((value >> 6) & 0x3F)));
        output.push_back(static_cast<char>(0x80 | (value & 0x3F)));
    } else {
        output.push_back(static_cast<char>(0xF0 | (value >> 18)));
        output.push_back(static_cast<char>(0x80 | ((value >> 12) & 0x3F)));
        output.push_back(static_cast<char>(0x80 | ((value >> 6) & 0x3F)));
        output.push_back(static_cast<char>(0x80 | (value & 0x3F)));
    }
    return true;
}

bool SYMBOL_CHARACTER::Decode_UTF8(
    std::string_view input,
    SYMBOL_NUMBER& value,
    std::size_t& consumed
) noexcept
{
    value = 0;
    consumed = 0;
    if (input.empty()) return false;

    const auto lead = static_cast<unsigned char>(input[0]);
    std::size_t length = 0;
    SYMBOL_NUMBER scalar = 0;

    if (lead <= 0x7F) {
        length = 1;
        scalar = lead;
    } else if (lead >= 0xC2 && lead <= 0xDF) {
        length = 2;
        scalar = lead & 0x1F;
    } else if (lead >= 0xE0 && lead <= 0xEF) {
        length = 3;
        scalar = lead & 0x0F;
    } else if (lead >= 0xF0 && lead <= 0xF4) {
        length = 4;
        scalar = lead & 0x07;
    } else {
        return false;
    }

    if (input.size() < length) return false;
    for (std::size_t index = 1; index < length; ++index) {
        const auto unit = static_cast<unsigned char>(input[index]);
        if ((unit & 0xC0) != 0x80) return false;
        scalar = static_cast<SYMBOL_NUMBER>((scalar << 6) | (unit & 0x3F));
    }

    if ((length == 2 && scalar < 0x80) ||
        (length == 3 && scalar < 0x800) ||
        (length == 4 && scalar < 0x10000) || !Is_Scalar(scalar)) {
        return false;
    }

    value = scalar;
    consumed = length;
    return true;
}

bool SYMBOL_NUMBER_FORMAT::Parse(
    std::string_view input,
    SYMBOL_NUMBER& output
) noexcept
{
    int base = 10;
    if (input.size() >= 2 && (input.substr(0, 2) == "U+" ||
                             input.substr(0, 2) == "u+" ||
                             input.substr(0, 2) == "0x" ||
                             input.substr(0, 2) == "0X")) {
        input.remove_prefix(2);
        base = 16;
    }
    if (input.empty()) return false;

    std::uint32_t value = 0;
    const auto result = std::from_chars(
        input.data(), input.data() + input.size(), value, base
    );
    if (result.ec != std::errc{} || result.ptr != input.data() + input.size()) {
        return false;
    }
    output = static_cast<SYMBOL_NUMBER>(value);
    return SYMBOL_CHARACTER::Is_Scalar(output);
}

std::string SYMBOL_NUMBER_FORMAT::Unicode(SYMBOL_NUMBER value)
{
    std::ostringstream stream;
    stream << "U+" << std::uppercase << std::hex << std::setfill('0')
           << std::setw(4) << static_cast<std::uint32_t>(value);
    return stream.str();
}

std::string SYMBOL_NUMBER_FORMAT::Decimal(SYMBOL_NUMBER value)
{
    return std::to_string(static_cast<std::uint32_t>(value));
}

std::string SYMBOL_NUMBER_FORMAT::Hexadecimal(SYMBOL_NUMBER value)
{
    std::ostringstream stream;
    stream << "0x" << std::uppercase << std::hex
           << static_cast<std::uint32_t>(value);
    return stream.str();
}

std::string SYMBOL_ESCAPE::Encode(SYMBOL_NUMBER value)
{
    switch (value) {
        case U'\0': return "\\0";
        case U'\a': return "\\a";
        case U'\b': return "\\b";
        case U'\t': return "\\t";
        case U'\n': return "\\n";
        case U'\v': return "\\v";
        case U'\f': return "\\f";
        case U'\r': return "\\r";
        case U'\\': return "\\\\";
        case U'\'': return "\\'";
        case U'\"': return "\\\"";
        default: break;
    }

    if (value >= 0x20 && value <= 0x7E) {
        return std::string(1, static_cast<char>(value));
    }

    std::ostringstream stream;
    stream << (value <= 0xFFFF ? "\\u" : "\\U")
           << std::uppercase << std::hex << std::setfill('0')
           << std::setw(value <= 0xFFFF ? 4 : 8)
           << static_cast<std::uint32_t>(value);
    return stream.str();
}

bool SYMBOL_ESCAPE::Decode(std::string_view input, SYMBOL_NUMBER& output) noexcept
{
    if (input.size() == 2 && input[0] == '\\') {
        switch (input[1]) {
            case '0': output = U'\0'; return true;
            case 'a': output = U'\a'; return true;
            case 'b': output = U'\b'; return true;
            case 't': output = U'\t'; return true;
            case 'n': output = U'\n'; return true;
            case 'v': output = U'\v'; return true;
            case 'f': output = U'\f'; return true;
            case 'r': output = U'\r'; return true;
            case '\\': output = U'\\'; return true;
            case '\'': output = U'\''; return true;
            case '"': output = U'"'; return true;
            default: return false;
        }
    }

    if ((input.size() == 6 && input.substr(0, 2) == "\\u") ||
        (input.size() == 10 && input.substr(0, 2) == "\\U") ||
        (input.size() == 4 && input.substr(0, 2) == "\\x")) {
        std::uint32_t value = 0;
        const auto digits = input.substr(2);
        const auto result = std::from_chars(
            digits.data(), digits.data() + digits.size(), value, 16
        );
        if (result.ec != std::errc{} ||
            result.ptr != digits.data() + digits.size()) return false;
        output = static_cast<SYMBOL_NUMBER>(value);
        return SYMBOL_CHARACTER::Is_Scalar(output);
    }
    return false;
}

std::string SYMBOL_ESCAPE::Escape_Text(std::string_view utf8)
{
    std::string output;
    for (std::size_t index = 0; index < utf8.size();) {
        SYMBOL_NUMBER value = 0;
        std::size_t consumed = 0;
        if (!SYMBOL_CHARACTER::Decode_UTF8(utf8.substr(index), value, consumed)) {
            return {};
        }
        output += Encode(value);
        index += consumed;
    }
    return output;
}

bool SYMBOL_ESCAPE::Unescape_Text(std::string_view escaped, std::string& utf8)
{
    utf8.clear();
    for (std::size_t index = 0; index < escaped.size();) {
        if (escaped[index] != '\\') {
            utf8.push_back(escaped[index++]);
            continue;
        }

        std::size_t length = 2;
        if (index + 1 >= escaped.size()) return false;
        if (escaped[index + 1] == 'u') length = 6;
        else if (escaped[index + 1] == 'U') length = 10;
        else if (escaped[index + 1] == 'x') length = 4;
        if (index + length > escaped.size()) return false;

        SYMBOL_NUMBER value = 0;
        if (!Decode(escaped.substr(index, length), value)) return false;
        std::string character;
        if (!SYMBOL_CHARACTER::Encode_UTF8(value, character)) return false;
        utf8 += character;
        index += length;
    }
    return true;
}

bool NEW_SYMBOL::Create(
    std::string name,
    SYMBOL_NUMBER number,
    SYMBOL& output,
    std::string description,
    META_SYMBOL::ORIGIN origin
)
{
    if (name.empty() || !SYMBOL_CHARACTER::Is_Scalar(number)) return false;

    std::string character;
    if (!SYMBOL_CHARACTER::Encode_UTF8(number, character)) return false;

    output.Name = std::move(name);
    output.Number = number;
    output.Character = std::move(character);
    output.Escape = SYMBOL_ESCAPE::Encode(number);
    output.Attributes = SYMBOL_CHARACTER::Classify(number);
    output.Metadata.Origin = origin;
    output.Metadata.Category = SYMBOL_CHARACTER::Category(number);
    output.Metadata.Description = std::move(description);
    return output.Is_Valid();
}

bool SYMBOL_TABLE::Insert(const SYMBOL& symbol)
{
    if (!symbol.Is_Valid() || Contains_Name(symbol.Name) ||
        Contains_Number(symbol.Number)) return false;

    By_Name.emplace(symbol.Name, symbol);
    Name_By_Number.emplace(symbol.Number, symbol.Name);
    return true;
}

bool SYMBOL_TABLE::Contains_Name(std::string_view name) const
{
    return By_Name.find(std::string(name)) != By_Name.end();
}

bool SYMBOL_TABLE::Contains_Number(SYMBOL_NUMBER number) const
{
    return Name_By_Number.find(number) != Name_By_Number.end();
}

const SYMBOL* SYMBOL_TABLE::Find_Name(std::string_view name) const
{
    const auto found = By_Name.find(std::string(name));
    return found == By_Name.end() ? nullptr : &found->second;
}

const SYMBOL* SYMBOL_TABLE::Find_Number(SYMBOL_NUMBER number) const
{
    const auto indexed = Name_By_Number.find(number);
    return indexed == Name_By_Number.end() ? nullptr : Find_Name(indexed->second);
}

std::vector<const SYMBOL*> SYMBOL_TABLE::List() const
{
    std::vector<const SYMBOL*> symbols;
    symbols.reserve(By_Name.size());
    for (const auto& entry : By_Name) symbols.push_back(&entry.second);
    std::sort(symbols.begin(), symbols.end(), [](const SYMBOL* left, const SYMBOL* right) {
        return left->Number < right->Number;
    });
    return symbols;
}

std::size_t SYMBOL_TABLE::Size() const noexcept { return By_Name.size(); }

void SYMBOL_TABLE::Clear() noexcept
{
    By_Name.clear();
    Name_By_Number.clear();
}

void SYMBOL_TABLE::Load_Defaults()
{
    Clear();
    SYMBOL symbol;

    for (char value = 'A'; value <= 'Z'; ++value) {
        NEW_SYMBOL::Create(
            std::string("LATIN_CAPITAL_") + value,
            static_cast<SYMBOL_NUMBER>(value), symbol, {}, META_SYMBOL::ORIGIN::ASCII
        );
        Insert(symbol);
    }
    for (char value = 'a'; value <= 'z'; ++value) {
        const char upper = static_cast<char>(value - ('a' - 'A'));
        NEW_SYMBOL::Create(
            std::string("LATIN_SMALL_") + upper,
            static_cast<SYMBOL_NUMBER>(value), symbol, {}, META_SYMBOL::ORIGIN::ASCII
        );
        Insert(symbol);
    }

    const char* digit_names[] = {
        "DIGIT_ZERO", "DIGIT_ONE", "DIGIT_TWO", "DIGIT_THREE", "DIGIT_FOUR",
        "DIGIT_FIVE", "DIGIT_SIX", "DIGIT_SEVEN", "DIGIT_EIGHT", "DIGIT_NINE"
    };
    for (char value = '0'; value <= '9'; ++value) {
        NEW_SYMBOL::Create(
            digit_names[value - '0'], static_cast<SYMBOL_NUMBER>(value),
            symbol, {}, META_SYMBOL::ORIGIN::ASCII
        );
        Insert(symbol);
    }

    const std::pair<const char*, char32_t> defaults[] = {
        {"SPACE", U' '}, {"EXCLAMATION", U'!'}, {"QUOTATION_MARK", U'"'},
        {"NUMBER_SIGN", U'#'},
        {"DOLLAR", U'$'}, {"PERCENT", U'%'}, {"AMPERSAND", U'&'},
        {"APOSTROPHE", U'\''},
        {"LEFT_PARENTHESIS", U'('}, {"RIGHT_PARENTHESIS", U')'},
        {"ASTERISK", U'*'}, {"PLUS", U'+'}, {"COMMA", U','},
        {"MINUS", U'-'}, {"FULL_STOP", U'.'}, {"SOLIDUS", U'/'},
        {"COLON", U':'}, {"SEMICOLON", U';'}, {"LESS_THAN", U'<'},
        {"EQUAL", U'='}, {"GREATER_THAN", U'>'}, {"QUESTION", U'?'},
        {"COMMERCIAL_AT", U'@'}, {"LEFT_BRACKET", U'['},
        {"BACKSLASH", U'\\'}, {"RIGHT_BRACKET", U']'},
        {"CARET", U'^'}, {"UNDERSCORE", U'_'}, {"GRAVE", U'`'},
        {"LEFT_BRACE", U'{'}, {"VERTICAL_LINE", U'|'},
        {"RIGHT_BRACE", U'}'}, {"TILDE", U'~'}
    };
    for (const auto& entry : defaults) {
        if (NEW_SYMBOL::Create(entry.first, entry.second, symbol, {},
                               META_SYMBOL::ORIGIN::ASCII)) Insert(symbol);
    }
}

} // namespace SYMBOLS

namespace {

constexpr std::string_view Version = "1.0.0";

void help()
{
    std::cout
        << "symbol " << Version << " - semantic symbol utility\n\n"
        << "Usage:\n"
        << "  symbol inspect <character|number|U+codepoint>\n"
        << "  symbol new <name> <number|U+codepoint>\n"
        << "  symbol find <name|number|U+codepoint>\n"
        << "  symbol list\n"
        << "  symbol escape <text>\n"
        << "  symbol unescape <escaped-text>\n"
        << "  symbol --help\n"
        << "  symbol --version\n";
}

void print_symbol(const SYMBOLS::SYMBOL& symbol)
{
    std::cout
        << "Name: " << symbol.Name << '\n'
        << "Character: " << symbol.Character << '\n'
        << "Unicode: " << SYMBOLS::SYMBOL_NUMBER_FORMAT::Unicode(symbol.Number) << '\n'
        << "Decimal: " << SYMBOLS::SYMBOL_NUMBER_FORMAT::Decimal(symbol.Number) << '\n'
        << "Hexadecimal: " << SYMBOLS::SYMBOL_NUMBER_FORMAT::Hexadecimal(symbol.Number) << '\n'
        << "Escape: " << symbol.Escape << '\n'
        << "Category: " << symbol.Metadata.Category << '\n'
        << "ASCII: " << (symbol.Attributes.Has(SYMBOLS::SYMBOL_ATTRIBUTE::ASCII)
            ? "yes" : "no") << '\n'
        << "Printable: " << (symbol.Attributes.Has(SYMBOLS::SYMBOL_ATTRIBUTE::Printable)
            ? "yes" : "no") << '\n';
}

bool resolve_number(std::string_view input, SYMBOLS::SYMBOL_NUMBER& number)
{
    if (SYMBOLS::SYMBOL_NUMBER_FORMAT::Parse(input, number)) return true;
    std::size_t consumed = 0;
    return SYMBOLS::SYMBOL_CHARACTER::Decode_UTF8(input, number, consumed) &&
           consumed == input.size();
}

int inspect(std::string_view input, const SYMBOLS::SYMBOL_TABLE& table)
{
    SYMBOLS::SYMBOL_NUMBER number = 0;
    if (!resolve_number(input, number)) {
        std::cerr << "symbol: expected one character or a valid scalar number\n";
        return 2;
    }

    if (const auto* existing = table.Find_Number(number)) {
        print_symbol(*existing);
        return 0;
    }

    SYMBOLS::SYMBOL symbol;
    if (!SYMBOLS::NEW_SYMBOL::Create(
            SYMBOLS::SYMBOL_NUMBER_FORMAT::Unicode(number), number, symbol,
            "Unregistered Unicode symbol", SYMBOLS::META_SYMBOL::ORIGIN::Unicode)) {
        return 2;
    }
    print_symbol(symbol);
    return 0;
}

int find(std::string_view input, const SYMBOLS::SYMBOL_TABLE& table)
{
    if (const auto* named = table.Find_Name(input)) {
        print_symbol(*named);
        return 0;
    }
    SYMBOLS::SYMBOL_NUMBER number = 0;
    if (resolve_number(input, number)) {
        if (const auto* numbered = table.Find_Number(number)) {
            print_symbol(*numbered);
            return 0;
        }
    }
    std::cerr << "symbol: symbol not found\n";
    return 3;
}

} // namespace

int main(int argument_count, char* arguments[])
{
    SYMBOLS::SYMBOL_TABLE table;
    table.Load_Defaults();

    if (argument_count == 1) { help(); return 0; }
    const std::string_view command = arguments[1];
    if (command == "--help" || command == "-h" || command == "help") {
        help(); return 0;
    }
    if (command == "--version" || command == "-v") {
        std::cout << "symbol " << Version << '\n'; return 0;
    }
    if (command == "inspect" && argument_count == 3) {
        return inspect(arguments[2], table);
    }
    if (command == "new" && argument_count == 4) {
        SYMBOLS::SYMBOL_NUMBER number = 0;
        SYMBOLS::SYMBOL symbol;
        if (!resolve_number(arguments[3], number) ||
            !SYMBOLS::NEW_SYMBOL::Create(arguments[2], number, symbol)) {
            std::cerr << "symbol: could not create symbol\n"; return 2;
        }
        print_symbol(symbol); return 0;
    }
    if (command == "find" && argument_count == 3) {
        return find(arguments[2], table);
    }
    if (command == "list" && argument_count == 2) {
        for (const auto* symbol : table.List()) {
            std::cout << SYMBOLS::SYMBOL_NUMBER_FORMAT::Unicode(symbol->Number)
                      << '\t' << symbol->Character << '\t' << symbol->Name << '\n';
        }
        return 0;
    }
    if (command == "escape" && argument_count == 3) {
        const std::string escaped = SYMBOLS::SYMBOL_ESCAPE::Escape_Text(arguments[2]);
        if (escaped.empty() && std::string_view(arguments[2]).size() != 0) {
            std::cerr << "symbol: invalid UTF-8 input\n"; return 2;
        }
        std::cout << escaped << '\n'; return 0;
    }
    if (command == "unescape" && argument_count == 3) {
        std::string text;
        if (!SYMBOLS::SYMBOL_ESCAPE::Unescape_Text(arguments[2], text)) {
            std::cerr << "symbol: invalid escape sequence\n"; return 2;
        }
        std::cout << text << '\n'; return 0;
    }

    std::cerr << "symbol: invalid command or argument count\n"
              << "Try 'symbol --help' for usage.\n";
    return 2;
}
