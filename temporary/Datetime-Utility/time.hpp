#ifndef TIME_HPP
#define TIME_HPP

#include <cstdint>
#include <string>

namespace CHRONO {

class TIME {
public:
    int Hour { 0 };
    int Minute { 0 };
    int Second { 0 };
    std::uint32_t Nanosecond { 0 };

    bool Is_Valid() const noexcept;
    std::string ISO(unsigned fractional_digits = 0) const;
    std::string Compact(unsigned fractional_digits = 0) const;
};

} // namespace CHRONO

#endif // TIME_HPP
