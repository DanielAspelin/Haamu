#ifndef DOMAINCONTROLLER_HPP
#define DOMAINCONTROLLER_HPP
#include "domainlist.hpp"
#include <string>
#include <string_view>
namespace DOMAIN {
class DOMAIN_CONTROLLER {
public:
    explicit DOMAIN_CONTROLLER(std::string registry);
    bool Load(std::string& error);
    bool Save(std::string& error) const;
    bool Add(const ENTRY& entry, std::string& error);
    bool Remove(std::string_view name, std::string& error);
    const DOMAIN_LIST& List() const noexcept;
private:
    std::string Registry;
    DOMAIN_LIST Domains;
};
}
#endif
