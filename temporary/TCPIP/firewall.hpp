#ifndef FIREWALL_HPP
#define FIREWALL_HPP

#include "allow.hpp"
#include "deny.hpp"

#include <string>
#include <vector>

namespace NET {

class FIREWALL {
public:
    enum class DECISION { Allow, Deny };

    void Add(const ALLOW& rule);
    void Add(const DENY& rule);
    void Default(DECISION decision) noexcept;
    DECISION Evaluate(const IP& address, const PORT& port,
                      const std::string& protocol) const;

private:
    std::vector<ALLOW> Allowed;
    std::vector<DENY> Denied;
    DECISION Default_Decision { DECISION::Deny };
};

} // namespace NET
#endif // FIREWALL_HPP
