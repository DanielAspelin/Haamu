#ifndef SERVER_HPP
#define SERVER_HPP

#include "host.hpp"

#include <cstddef>

namespace NET {

class SERVER {
public:
    HOST Local;
    std::size_t Backlog { 16 };

    bool Is_Valid() const noexcept;
};

} // namespace NET
#endif // SERVER_HPP
