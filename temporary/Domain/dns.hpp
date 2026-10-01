#ifndef DNS_HPP
#define DNS_HPP
#include <string>
#include <string_view>
#include <vector>
namespace DOMAIN {
class DNS {
public:
    static bool Resolve(std::string_view name, std::vector<std::string>& addresses,
                        std::string& error);
};
}
#endif
