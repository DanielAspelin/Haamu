#ifndef VIRTUALHOST_HPP
#define VIRTUALHOST_HPP
#include "domainname.hpp"
#include "http.hpp"
#include "https.hpp"
#include "ssl.hpp"
#include <filesystem>
namespace DOMAIN {
class VIRTUAL_HOST {
public:
    DOMAIN_NAME Name;
    std::filesystem::path Root;
    HTTP HTTP_Config;
    HTTPS HTTPS_Config;
    SSL TLS;
    bool Is_Valid() const noexcept;
};
}
#endif
