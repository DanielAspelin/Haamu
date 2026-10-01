#ifndef LOCATOR_HPP
#define LOCATOR_HPP
#include "domainname.hpp"
#include <filesystem>
#include <string>
namespace DOMAIN {
class LOCATOR {
public:
    static std::filesystem::path Domain_Root(const std::filesystem::path& base,
                                              const DOMAIN_NAME& name);
    static std::filesystem::path Index(const std::filesystem::path& root,
                                       const std::string& entry = "index.html");
};
}
#endif
