#ifndef HTTPS_HPP
#define HTTPS_HPP
#include <cstdint>
namespace DOMAIN {
class HTTPS {
public:
    bool Enabled { false };
    std::uint16_t Port { 443 };
    bool HTTP2 { true };
    bool Is_Valid() const noexcept { return !Enabled || Port != 0; }
};
}
#endif
