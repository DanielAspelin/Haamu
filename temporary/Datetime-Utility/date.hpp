#ifndef DATE_HPP
#define DATE_HPP

#include <string>

namespace CHRONO {

class DATE {
public:
    int Year { 1970 };
    int Month { 1 };
    int Day { 1 };
    int Weekday { 4 };
    int Yearday { 0 };

    bool Is_Valid() const noexcept;
    std::string ISO() const;
    std::string Compact() const;
};

} // namespace CHRONO

#endif // DATE_HPP
