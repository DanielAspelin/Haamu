#ifndef INDEXROOT_HPP
#define INDEXROOT_HPP
#include <filesystem>
namespace DOMAIN {
class INDEX_ROOT {
public:
    std::filesystem::path Path;
    bool Is_File() const;
};
}
#endif
