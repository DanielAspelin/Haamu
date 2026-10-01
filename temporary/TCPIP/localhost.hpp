#ifndef LOCALHOST_HPP
#define LOCALHOST_HPP

#include "host.hpp"

namespace NET {

class LOCALHOST {
public:
    static HOST IPv4();
    static HOST IPv6();
    static bool Is_Local(const IP& address) noexcept;
};

} // namespace NET
#endif // LOCALHOST_HPP
