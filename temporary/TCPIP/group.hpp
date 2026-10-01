#ifndef GROUP_HPP
#define GROUP_HPP

#include "host.hpp"

#include <string>
#include <vector>

namespace NET {

class GROUP {
public:
    explicit GROUP(std::string name = {});
    bool Add(const HOST& host);
    const std::string& Name() const noexcept;
    const std::vector<HOST>& Members() const noexcept;

private:
    std::string Group_Name;
    std::vector<HOST> Group_Members;
};

} // namespace NET
#endif // GROUP_HPP
