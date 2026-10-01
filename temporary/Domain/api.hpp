#ifndef API_HPP
#define API_HPP
#include "url.hpp"
#include <string>
namespace DOMAIN {
class API {
public:
    std::string Name;
    URL Endpoint;
    std::string Version { "v1" };
    bool Is_Valid() const noexcept;
};
}
#endif
