#ifndef METASYMBOL_HPP
#define METASYMBOL_HPP

#include <cstdint>
#include <string>

namespace SYMBOLS {

class META_SYMBOL {
public:
    enum class ORIGIN {
        Builtin,
        ASCII,
        Unicode,
        User
    };

    ORIGIN Origin { ORIGIN::User };
    std::string Category { "unclassified" };
    std::string Description;
    std::uint32_t Version { 1 };
};

} // namespace SYMBOLS

#endif // METASYMBOL_HPP
