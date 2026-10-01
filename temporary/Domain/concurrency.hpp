#ifndef CONCURRENCY_HPP
#define CONCURRENCY_HPP
#include <cstddef>
namespace DOMAIN {
class CONCURRENCY {
public:
    std::size_t Workers { 1 };
    std::size_t Queue_Limit { 64 };
    bool Is_Valid() const noexcept { return Workers > 0 && Queue_Limit > 0; }
};
}
#endif
