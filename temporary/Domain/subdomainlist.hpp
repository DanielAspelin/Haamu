#ifndef SUBDOMAINLIST_HPP
#define SUBDOMAINLIST_HPP
#include "subdomain.hpp"
#include <string_view>
#include <vector>
namespace DOMAIN {
class SUBDOMAIN_LIST {
public:
    bool Add(const SUBDOMAIN& value);
    bool Remove(std::string_view value);
    const std::vector<SUBDOMAIN>& Entries() const noexcept;
private:
    std::vector<SUBDOMAIN> Values;
};
}
#endif
