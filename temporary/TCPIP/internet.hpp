#ifndef INTERNET_HPP
#define INTERNET_HPP

#include "ip.hpp"

#include <string>
#include <string_view>
#include <vector>

namespace NET {

class INTERNET {
public:
    static bool Resolve(std::string_view host, std::string_view service,
                        std::vector<IP>& addresses, std::string& error);
};

} // namespace NET
#endif // INTERNET_HPP
