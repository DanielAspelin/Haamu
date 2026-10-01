#ifndef WWWROOT_HPP
#define WWWROOT_HPP
#include <filesystem>
namespace DOMAIN {
class WWW_ROOT {
public:
    std::filesystem::path Path;
    bool Exists() const;
};
}
#endif
