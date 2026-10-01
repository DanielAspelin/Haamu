#ifndef WEB_HPP
#define WEB_HPP
#include "virtualhost.hpp"
#include <vector>
namespace DOMAIN {
class WEB {
public:
    bool Add(const VIRTUAL_HOST& host);
    const std::vector<VIRTUAL_HOST>& Hosts() const noexcept;
private:
    std::vector<VIRTUAL_HOST> Values;
};
}
#endif
