#ifndef COOKIE_HPP
#define COOKIE_HPP
#include <string>
namespace DOMAIN {
class COOKIE {
public:
    std::string Name;
    std::string Value;
    std::string Domain;
    std::string Path { "/" };
    bool Secure { true };
    bool HTTP_Only { true };
    bool Is_Valid() const noexcept;
};
}
#endif
