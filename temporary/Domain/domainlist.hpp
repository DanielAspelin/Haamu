#ifndef DOMAINLIST_HPP
#define DOMAINLIST_HPP
#include "entry.hpp"
#include <string>
#include <string_view>
#include <vector>
namespace DOMAIN {
class DOMAIN_LIST {
public:
    bool Add(const ENTRY& entry);
    bool Remove(std::string_view name);
    const ENTRY* Find(std::string_view name) const;
    const std::vector<ENTRY>& Entries() const noexcept;
    bool Load(const std::string& path, std::string& error);
    bool Save(const std::string& path, std::string& error) const;
private:
    std::vector<ENTRY> Values;
};
}
#endif
