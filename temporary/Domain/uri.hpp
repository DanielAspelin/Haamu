#ifndef URI_HPP
#define URI_HPP
#include <string>
#include <string_view>
namespace DOMAIN {
class URI {
public:
    std::string Scheme;
    std::string Authority;
    std::string Path;
    std::string Query;
    std::string Fragment;
    static bool Parse(std::string_view value, URI& output);
    bool Is_Valid() const noexcept;
    std::string String() const;
};
}
#endif
