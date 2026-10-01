#ifndef SSL_HPP
#define SSL_HPP
#include <string>
namespace DOMAIN {
class SSL {
public:
    std::string Certificate;
    std::string Private_Key;
    std::string Chain;
    bool Enabled { false };
    bool Is_Valid() const noexcept;
};
}
#endif
