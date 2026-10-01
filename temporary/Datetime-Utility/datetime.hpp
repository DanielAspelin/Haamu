#ifndef DATETIME_HPP
#define DATETIME_HPP

#include "date.hpp"
#include "time.hpp"

#include <chrono>
#include <filesystem>
#include <string>

namespace CHRONO {

enum class ZONE {
    Local,
    UTC
};

enum class SCOPE {
    Date,
    Time,
    Date_Time
};

enum class FORMAT {
    ISO,
    Compact,
    Stamp,
    Unix
};

enum class PRECISION : unsigned {
    Seconds = 0,
    Milliseconds = 3,
    Microseconds = 6,
    Nanoseconds = 9
};

class OPTIONS {
public:
    ZONE Zone { ZONE::Local };
    SCOPE Scope { SCOPE::Date_Time };
    FORMAT Format { FORMAT::ISO };
    PRECISION Precision { PRECISION::Seconds };
    std::filesystem::path Output;
    bool Append { false };
    bool Quiet { false };
    bool Create_Directories { false };
};

class DATETIME {
public:
    DATE Date;
    TIME Time;
    ZONE Zone { ZONE::Local };
    std::string Zone_Name;
    std::string UTC_Offset;
    std::chrono::system_clock::time_point Point;

    static DATETIME Now(ZONE zone = ZONE::Local);
    std::string Format(const OPTIONS& options) const;

    static bool Write(
        const std::filesystem::path& output,
        const std::string& value,
        bool append,
        bool create_directories,
        std::string& error
    );
};

} // namespace CHRONO

#endif // DATETIME_HPP
