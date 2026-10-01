#ifndef SYMBOLNUMBER_HPP
#define SYMBOLNUMBER_HPP

#include "symbol.hpp"

#include <string>
#include <string_view>

namespace SYMBOLS {

class SYMBOL_NUMBER_FORMAT {
public:
    static bool Parse(std::string_view input, SYMBOL_NUMBER& output) noexcept;
    static std::string Unicode(SYMBOL_NUMBER value);
    static std::string Decimal(SYMBOL_NUMBER value);
    static std::string Hexadecimal(SYMBOL_NUMBER value);
};

} // namespace SYMBOLS

#endif // SYMBOLNUMBER_HPP
