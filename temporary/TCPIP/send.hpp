#ifndef SEND_HPP
#define SEND_HPP

#include <cstddef>
#include <string>
#include <vector>

namespace NET {

class SEND {
public:
    std::vector<unsigned char> Data;
    std::size_t Transferred { 0 };
    std::string Error;

    bool Succeeded() const noexcept;
};

} // namespace NET
#endif // SEND_HPP
