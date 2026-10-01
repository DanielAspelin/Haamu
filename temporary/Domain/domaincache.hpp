#ifndef DOMAINCACHE_HPP
#define DOMAINCACHE_HPP
#include "cache.hpp"
#include <string>
#include <string_view>
#include <unordered_map>
namespace DOMAIN {
class DOMAIN_CACHE {
public:
    void Put(CACHE entry);
    const CACHE* Get(std::string_view key) const;
    std::size_t Purge();
private:
    std::unordered_map<std::string, CACHE> Entries;
};
}
#endif
