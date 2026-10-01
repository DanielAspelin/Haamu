#ifndef REMOVEDOMAIN_HPP
#define REMOVEDOMAIN_HPP
#include "domainlist.hpp"
#include <string>
#include <string_view>
namespace DOMAIN {
class REMOVE_DOMAIN {
public:
    static bool Apply(DOMAIN_LIST& list, std::string_view name, std::string& error);
};
}
#endif
