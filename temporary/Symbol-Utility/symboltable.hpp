#ifndef SYMBOLTABLE_HPP
#define SYMBOLTABLE_HPP

#include "symbol.hpp"

#include <cstddef>
#include <string>
#include <string_view>
#include <unordered_map>
#include <vector>

namespace SYMBOLS {

class SYMBOL_TABLE {
public:
    bool Insert(const SYMBOL& symbol);
    bool Contains_Name(std::string_view name) const;
    bool Contains_Number(SYMBOL_NUMBER number) const;
    const SYMBOL* Find_Name(std::string_view name) const;
    const SYMBOL* Find_Number(SYMBOL_NUMBER number) const;
    std::vector<const SYMBOL*> List() const;
    std::size_t Size() const noexcept;
    void Clear() noexcept;
    void Load_Defaults();

private:
    std::unordered_map<std::string, SYMBOL> By_Name;
    std::unordered_map<SYMBOL_NUMBER, std::string> Name_By_Number;
};

} // namespace SYMBOLS

#endif // SYMBOLTABLE_HPP
