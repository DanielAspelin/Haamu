#ifndef SYMBOLESCAPE_HPP
#define SYMBOLESCAPE_HPP

#include "symbol.hpp"

#include <string>
#include <string_view>

namespace SYMBOLS {

class SYMBOL_ESCAPE {
public:
    static std::string Encode(SYMBOL_NUMBER value);
    static bool Decode(std::string_view input, SYMBOL_NUMBER& output) noexcept;
    static std::string Escape_Text(std::string_view utf8);
    static bool Unescape_Text(std::string_view escaped, std::string& utf8);
};

} // namespace SYMBOLS

#endif // SYMBOLESCAPE_HPP
