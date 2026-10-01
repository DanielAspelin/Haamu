#ifndef SYMBOL_HPP
#define SYMBOL_HPP

#include "metasymbol.hpp"
#include "symbolattribute.hpp"

#include <cstdint>
#include <string>

namespace SYMBOLS {

using SYMBOL_NUMBER = char32_t;

class SYMBOL {
public:
    std::string Name;
    SYMBOL_NUMBER Number { 0 };
    std::string Character;
    std::string Escape;
    SYMBOL_ATTRIBUTE_SET Attributes;
    META_SYMBOL Metadata;

    bool Is_Valid() const noexcept;
};

} // namespace SYMBOLS

#endif // SYMBOL_HPP
