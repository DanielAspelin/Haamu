#ifndef NEWSYMBOL_HPP
#define NEWSYMBOL_HPP

#include "symbol.hpp"

#include <string>

namespace SYMBOLS {

class NEW_SYMBOL {
public:
    static bool Create(
        std::string name,
        SYMBOL_NUMBER number,
        SYMBOL& output,
        std::string description = {},
        META_SYMBOL::ORIGIN origin = META_SYMBOL::ORIGIN::User
    );
};

} // namespace SYMBOLS

#endif // NEWSYMBOL_HPP
