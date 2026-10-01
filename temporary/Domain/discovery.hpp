#ifndef DISCOVERY_HPP
#define DISCOVERY_HPP
#include "entry.hpp"
#include <string>
#include <vector>
namespace DOMAIN {
class DISCOVERY {
public:
    static bool Inspect(const ENTRY& entry, std::vector<std::string>& addresses,
                        std::string& error);
};
}
#endif
