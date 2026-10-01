#ifndef HTDOCS_HPP
#define HTDOCS_HPP
#include <filesystem>
namespace DOMAIN {
class HTDOCS {
public:
    std::filesystem::path Path;
    bool Exists() const;
};
}
#endif
