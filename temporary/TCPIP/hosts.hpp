#ifndef HOSTS_HPP
#define HOSTS_HPP

#include "host.hpp"

#include <string>
#include <string_view>
#include <unordered_map>
#include <vector>

namespace NET {

class HOSTS {
public:
    bool Insert(const HOST& host);
    const HOST* Find(std::string_view name) const;
    std::vector<HOST> List() const;
    bool Load_File(const std::string& path, std::string& error);
    std::size_t Size() const noexcept;

private:
    std::unordered_map<std::string, HOST> Entries;
};

} // namespace NET
#endif // HOSTS_HPP
