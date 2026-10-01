#ifndef GLOBALHOST_HPP
#define GLOBALHOST_HPP

#include "host.hpp"

namespace NET {

class GLOBALHOST {
public:
    explicit GLOBALHOST(HOST host = {});
    bool Is_Valid() const noexcept;
    const HOST& Value() const noexcept;

private:
    HOST Host;
};

} // namespace NET
#endif // GLOBALHOST_HPP
