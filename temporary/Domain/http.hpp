#ifndef HTTP_HPP
#define HTTP_HPP
#include <cstdint>
namespace DOMAIN {
class HTTP {
public:
    bool Enabled { true };
    std::uint16_t Port { 80 };
    bool Redirect_To_HTTPS { false };
    bool Is_Valid() const noexcept { return !Enabled || Port != 0; }
};
}
#endif
