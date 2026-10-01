#ifndef ROUTER_HPP
#define ROUTER_HPP

#include "route.hpp"

#include <vector>

namespace NET {

class ROUTER {
public:
    bool Add(const ROUTE& route);
    const std::vector<ROUTE>& Routes() const noexcept;
    const ROUTE* Default() const noexcept;

private:
    std::vector<ROUTE> Table;
};

} // namespace NET
#endif // ROUTER_HPP
