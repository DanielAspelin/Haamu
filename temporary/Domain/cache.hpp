#ifndef CACHE_HPP
#define CACHE_HPP
#include <chrono>
#include <string>
namespace DOMAIN {
class CACHE {
public:
    std::string Key;
    std::string Value;
    std::chrono::system_clock::time_point Expires;
    bool Is_Expired() const noexcept;
};
}
#endif
