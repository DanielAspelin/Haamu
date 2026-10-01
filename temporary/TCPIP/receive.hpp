#ifndef RECEIVE_HPP
#define RECEIVE_HPP

#include <cstddef>
#include <string>
#include <vector>

namespace NET {

class RECEIVE {
public:
    std::vector<unsigned char> Data;
    std::size_t Transferred { 0 };
    std::string Error;

    bool Succeeded() const noexcept;
};

} // namespace NET
#endif // RECEIVE_HPP
