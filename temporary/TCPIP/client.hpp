#ifndef CLIENT_HPP
#define CLIENT_HPP

#include "host.hpp"

#include <chrono>

namespace NET {

class CLIENT {
public:
    HOST Remote;
    std::chrono::milliseconds Timeout { 3000 };

    bool Is_Valid() const noexcept;
};

} // namespace NET
#endif // CLIENT_HPP
