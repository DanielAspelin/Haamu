#ifndef ADDDOMAIN_HPP
#define ADDDOMAIN_HPP
#include "domainlist.hpp"
#include <string>
namespace DOMAIN {
class ADD_DOMAIN {
public:
    static bool Apply(DOMAIN_LIST& list, const ENTRY& entry, std::string& error);
};
}
#endif
