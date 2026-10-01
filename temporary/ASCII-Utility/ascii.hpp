#ifndef ASCII_HPP
#define ASCII_HPP

#include <cstddef>
#include <cstdint>
#include <string_view>

namespace ASCII {

using Integer_Type = std::uint8_t;
using Character_Type = char;
using String_Type = std::string_view;

class SPECIFIER {
public:
    enum class TYPE {
        Invalid,
        Control,
        Whitespace,
        Digit,
        Uppercase,
        Lowercase,
        Alphabetic,
        Alphanumeric,
        Punctuation,
        Symbol,
        Printable
    };
};

class REFERENTIAL {
public:
    inline static constexpr int Minimum = 0;
    inline static constexpr int Maximum = 127;
    inline static constexpr int Control_Begin = 0;
    inline static constexpr int Control_End = 31;
    inline static constexpr int Printable_Begin = 32;
    inline static constexpr int Printable_End = 126;
    inline static constexpr int Delete = 127;
    inline static constexpr int Digit_Begin = 48;
    inline static constexpr int Digit_End = 57;
    inline static constexpr int Uppercase_Begin = 65;
    inline static constexpr int Uppercase_End = 90;
    inline static constexpr int Lowercase_Begin = 97;
    inline static constexpr int Lowercase_End = 122;
    inline static constexpr std::size_t Character_Count = 128;
};

class CLASSIFIER {
public:
    static constexpr bool Is_ASCII(int value) noexcept
    {
        return value >= REFERENTIAL::Minimum && value <= REFERENTIAL::Maximum;
    }

    static constexpr bool Is_Control(int value) noexcept
    {
        return (value >= REFERENTIAL::Control_Begin &&
                value <= REFERENTIAL::Control_End) ||
               value == REFERENTIAL::Delete;
    }

    static constexpr bool Is_Printable(int value) noexcept
    {
        return value >= REFERENTIAL::Printable_Begin &&
               value <= REFERENTIAL::Printable_End;
    }

    static constexpr bool Is_Uppercase(Character_Type value) noexcept
    {
        return value >= 'A' && value <= 'Z';
    }

    static constexpr bool Is_Lowercase(Character_Type value) noexcept
    {
        return value >= 'a' && value <= 'z';
    }

    static constexpr bool Is_Alphabetic(Character_Type value) noexcept
    {
        return Is_Uppercase(value) || Is_Lowercase(value);
    }

    static constexpr bool Is_Digit(Character_Type value) noexcept
    {
        return value >= '0' && value <= '9';
    }

    static constexpr bool Is_Alphanumeric(Character_Type value) noexcept
    {
        return Is_Alphabetic(value) || Is_Digit(value);
    }

    static constexpr bool Is_Whitespace(Character_Type value) noexcept
    {
        return value == ' '  || value == '\t' || value == '\n' ||
               value == '\r' || value == '\f' || value == '\v';
    }

    static constexpr bool Is_Punctuation(Character_Type value) noexcept
    {
        return Is_Printable(static_cast<unsigned char>(value)) &&
               !Is_Alphanumeric(value) && !Is_Whitespace(value);
    }

    static constexpr SPECIFIER::TYPE Classify(Character_Type value) noexcept
    {
        const int integer = static_cast<unsigned char>(value);

        if (!Is_ASCII(integer)) return SPECIFIER::TYPE::Invalid;
        if (Is_Control(integer)) return SPECIFIER::TYPE::Control;
        if (Is_Whitespace(value)) return SPECIFIER::TYPE::Whitespace;
        if (Is_Digit(value)) return SPECIFIER::TYPE::Digit;
        if (Is_Uppercase(value)) return SPECIFIER::TYPE::Uppercase;
        if (Is_Lowercase(value)) return SPECIFIER::TYPE::Lowercase;
        if (Is_Punctuation(value)) return SPECIFIER::TYPE::Punctuation;
        return SPECIFIER::TYPE::Printable;
    }
};

class CONTEXTUAL {
public:
    enum class CONTEXT {
        Unknown,
        Text,
        Identifier,
        Number,
        Whitespace,
        Control,
        Delimiter,
        Operator
    };

    static constexpr CONTEXT Resolve(Character_Type value) noexcept
    {
        if (CLASSIFIER::Is_Alphabetic(value) || value == '_') {
            return CONTEXT::Identifier;
        }
        if (CLASSIFIER::Is_Digit(value)) return CONTEXT::Number;
        if (CLASSIFIER::Is_Whitespace(value)) return CONTEXT::Whitespace;
        if (CLASSIFIER::Is_Control(static_cast<unsigned char>(value))) {
            return CONTEXT::Control;
        }
        return CONTEXT::Text;
    }
};

class SEQUENCE {
public:
    enum class ORDER {
        Before = -1,
        Equal = 0,
        After = 1
    };

    static constexpr ORDER Compare(
        Character_Type left,
        Character_Type right
    ) noexcept
    {
        return left < right ? ORDER::Before
             : left > right ? ORDER::After
                            : ORDER::Equal;
    }

    static constexpr Character_Type Next(Character_Type value) noexcept
    {
        return value < REFERENTIAL::Maximum
            ? static_cast<Character_Type>(value + 1)
            : value;
    }

    static constexpr Character_Type Previous(Character_Type value) noexcept
    {
        return value > REFERENTIAL::Minimum
            ? static_cast<Character_Type>(value - 1)
            : value;
    }
};

class CONDITION {
public:
    enum class STATE {
        Invalid,
        Valid,
        Printable,
        Nonprintable
    };

    static constexpr STATE Evaluate(int value) noexcept
    {
        if (!CLASSIFIER::Is_ASCII(value)) return STATE::Invalid;
        return CLASSIFIER::Is_Printable(value)
            ? STATE::Printable
            : STATE::Nonprintable;
    }

    static constexpr bool Is_Valid(int value) noexcept
    {
        return CLASSIFIER::Is_ASCII(value);
    }
};

class CONVERTER {
public:
    static constexpr Integer_Type To_Integer(Character_Type value) noexcept
    {
        return static_cast<Integer_Type>(value);
    }

    static constexpr Character_Type To_Character(Integer_Type value) noexcept
    {
        return static_cast<Character_Type>(value);
    }

    static constexpr Character_Type To_Uppercase(Character_Type value) noexcept
    {
        return CLASSIFIER::Is_Lowercase(value)
            ? static_cast<Character_Type>(value - ('a' - 'A'))
            : value;
    }

    static constexpr Character_Type To_Lowercase(Character_Type value) noexcept
    {
        return CLASSIFIER::Is_Uppercase(value)
            ? static_cast<Character_Type>(value + ('a' - 'A'))
            : value;
    }
};

template<Integer_Type Integer_Value, Character_Type Character_Value>
class CHARACTER {
public:
    inline static constexpr Integer_Type Integer = Integer_Value;
    inline static constexpr Character_Type Character = Character_Value;
    inline static constexpr Character_Type Escape = Character_Value;
    inline static constexpr Character_Type String_Data[2] = {
        Character_Value, '\0'
    };
    inline static constexpr String_Type String { String_Data, 1 };

    static constexpr bool Is_Printable() noexcept
    {
        return CLASSIFIER::Is_Printable(Integer_Value);
    }

    static constexpr SPECIFIER::TYPE Type() noexcept
    {
        return CLASSIFIER::Classify(Character_Value);
    }
};

class NUL final : public CHARACTER<0, '\0'> {};
class TAB final : public CHARACTER<9, '\t'> {};
class LINE_FEED final : public CHARACTER<10, '\n'> {};
class VERTICAL_TAB final : public CHARACTER<11, '\v'> {};
class FORM_FEED final : public CHARACTER<12, '\f'> {};
class CARRIAGE_RETURN final : public CHARACTER<13, '\r'> {};
class ESCAPE final : public CHARACTER<27, '\x1B'> {};
class SPACE final : public CHARACTER<32, ' '> {};
class DELETE final : public CHARACTER<127, '\x7F'> {};

class ZERO final : public CHARACTER<48, '0'> {};
class ONE final : public CHARACTER<49, '1'> {};
class TWO final : public CHARACTER<50, '2'> {};
class THREE final : public CHARACTER<51, '3'> {};
class FOUR final : public CHARACTER<52, '4'> {};
class FIVE final : public CHARACTER<53, '5'> {};
class SIX final : public CHARACTER<54, '6'> {};
class SEVEN final : public CHARACTER<55, '7'> {};
class EIGHT final : public CHARACTER<56, '8'> {};
class NINE final : public CHARACTER<57, '9'> {};

class A final : public CHARACTER<65, 'A'> {};
class B final : public CHARACTER<66, 'B'> {};
class C final : public CHARACTER<67, 'C'> {};
class D final : public CHARACTER<68, 'D'> {};
class E final : public CHARACTER<69, 'E'> {};
class F final : public CHARACTER<70, 'F'> {};
class G final : public CHARACTER<71, 'G'> {};
class H final : public CHARACTER<72, 'H'> {};
class I final : public CHARACTER<73, 'I'> {};
class J final : public CHARACTER<74, 'J'> {};
class K final : public CHARACTER<75, 'K'> {};
class L final : public CHARACTER<76, 'L'> {};
class M final : public CHARACTER<77, 'M'> {};
class N final : public CHARACTER<78, 'N'> {};
class O final : public CHARACTER<79, 'O'> {};
class P final : public CHARACTER<80, 'P'> {};
class Q final : public CHARACTER<81, 'Q'> {};
class R final : public CHARACTER<82, 'R'> {};
class S final : public CHARACTER<83, 'S'> {};
class T final : public CHARACTER<84, 'T'> {};
class U final : public CHARACTER<85, 'U'> {};
class V final : public CHARACTER<86, 'V'> {};
class W final : public CHARACTER<87, 'W'> {};
class X final : public CHARACTER<88, 'X'> {};
class Y final : public CHARACTER<89, 'Y'> {};
class Z final : public CHARACTER<90, 'Z'> {};

class LOWER_A final : public CHARACTER<97, 'a'> {};
class LOWER_B final : public CHARACTER<98, 'b'> {};
class LOWER_C final : public CHARACTER<99, 'c'> {};
class LOWER_D final : public CHARACTER<100, 'd'> {};
class LOWER_E final : public CHARACTER<101, 'e'> {};
class LOWER_F final : public CHARACTER<102, 'f'> {};
class LOWER_G final : public CHARACTER<103, 'g'> {};
class LOWER_H final : public CHARACTER<104, 'h'> {};
class LOWER_I final : public CHARACTER<105, 'i'> {};
class LOWER_J final : public CHARACTER<106, 'j'> {};
class LOWER_K final : public CHARACTER<107, 'k'> {};
class LOWER_L final : public CHARACTER<108, 'l'> {};
class LOWER_M final : public CHARACTER<109, 'm'> {};
class LOWER_N final : public CHARACTER<110, 'n'> {};
class LOWER_O final : public CHARACTER<111, 'o'> {};
class LOWER_P final : public CHARACTER<112, 'p'> {};
class LOWER_Q final : public CHARACTER<113, 'q'> {};
class LOWER_R final : public CHARACTER<114, 'r'> {};
class LOWER_S final : public CHARACTER<115, 's'> {};
class LOWER_T final : public CHARACTER<116, 't'> {};
class LOWER_U final : public CHARACTER<117, 'u'> {};
class LOWER_V final : public CHARACTER<118, 'v'> {};
class LOWER_W final : public CHARACTER<119, 'w'> {};
class LOWER_X final : public CHARACTER<120, 'x'> {};
class LOWER_Y final : public CHARACTER<121, 'y'> {};
class LOWER_Z final : public CHARACTER<122, 'z'> {};

} // namespace ASCII

#endif // ASCII_HPP