#ifndef PROXY_HPP
#define PROXY_HPP

#include "host.hpp"

#include <string>

namespace NET {

class PROXY {
public:
    enum class TYPE { None, HTTP, HTTPS, SOCKS5 };

    TYPE Type { TYPE::None };
    HOST Endpoint;
    std::string Username;

    bool Is_Valid() const noexcept;
};

} // namespace NET
#endif // PROXY_HPP
