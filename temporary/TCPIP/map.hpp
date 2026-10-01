#ifndef MAP_HPP
#define MAP_HPP

#include "host.hpp"

#include <string>
#include <string_view>
#include <unordered_map>

namespace NET {

class MAP {
public:
    bool Bind(std::string alias, HOST host);
    const HOST* Resolve(std::string_view alias) const;
    bool Remove(std::string_view alias);
    std::size_t Size() const noexcept;

private:
    std::unordered_map<std::string, HOST> Bindings;
};

} // namespace NET
#endif // MAP_HPP
