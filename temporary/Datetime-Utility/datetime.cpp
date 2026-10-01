#include "datetime.hpp"
#include "date.hpp"
#include "time.hpp"

#include <chrono>
#include <cstdint>
#include <ctime>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <string>
#include <string_view>

namespace {

bool leap_year(int year) noexcept
{
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

std::tm convert_time(std::time_t value, CHRONO::ZONE zone)
{
    std::tm result {};
#if defined(_WIN32)
    if (zone == CHRONO::ZONE::UTC) gmtime_s(&result, &value);
    else localtime_s(&result, &value);
#else
    if (zone == CHRONO::ZONE::UTC) gmtime_r(&value, &result);
    else localtime_r(&value, &result);
#endif
    return result;
}

std::string tm_field(const std::tm& value, const char* format)
{
    char buffer[64] {};
    return std::strftime(buffer, sizeof(buffer), format, &value) != 0
        ? std::string(buffer)
        : std::string();
}

std::string fraction(std::uint32_t nanosecond, unsigned digits)
{
    if (digits == 0) return {};
    std::ostringstream stream;
    stream << std::setw(9) << std::setfill('0') << nanosecond;
    return stream.str().substr(0, digits);
}

std::string colonized_offset(std::string offset)
{
    if (offset.size() == 5 && (offset[0] == '+' || offset[0] == '-')) {
        offset.insert(3, ":");
    }
    return offset;
}

} // namespace

namespace CHRONO {

bool DATE::Is_Valid() const noexcept
{
    if (Year < 1 || Month < 1 || Month > 12 || Day < 1) return false;
    static constexpr int days[] = {
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    };
    const int maximum = Month == 2 && leap_year(Year)
        ? 29
        : days[Month - 1];
    return Day <= maximum;
}

std::string DATE::ISO() const
{
    std::ostringstream stream;
    stream << std::setw(4) << std::setfill('0') << Year << '-'
           << std::setw(2) << Month << '-'
           << std::setw(2) << Day;
    return stream.str();
}

std::string DATE::Compact() const
{
    std::ostringstream stream;
    stream << std::setw(4) << std::setfill('0') << Year
           << std::setw(2) << Month
           << std::setw(2) << Day;
    return stream.str();
}

bool TIME::Is_Valid() const noexcept
{
    return Hour >= 0 && Hour <= 23 && Minute >= 0 && Minute <= 59 &&
           Second >= 0 && Second <= 60 && Nanosecond <= 999999999;
}

std::string TIME::ISO(unsigned fractional_digits) const
{
    std::ostringstream stream;
    stream << std::setw(2) << std::setfill('0') << Hour << ':'
           << std::setw(2) << Minute << ':'
           << std::setw(2) << Second;
    if (fractional_digits != 0) {
        stream << '.' << fraction(Nanosecond, fractional_digits);
    }
    return stream.str();
}

std::string TIME::Compact(unsigned fractional_digits) const
{
    std::ostringstream stream;
    stream << std::setw(2) << std::setfill('0') << Hour
           << std::setw(2) << Minute
           << std::setw(2) << Second;
    if (fractional_digits != 0) {
        stream << '.' << fraction(Nanosecond, fractional_digits);
    }
    return stream.str();
}

DATETIME DATETIME::Now(ZONE zone)
{
    DATETIME result;
    result.Zone = zone;
    result.Point = std::chrono::system_clock::now();

    const auto epoch_nanoseconds = std::chrono::duration_cast<std::chrono::nanoseconds>(
        result.Point.time_since_epoch()
    ).count();
    const auto nanosecond = static_cast<std::uint32_t>(
        (epoch_nanoseconds % 1000000000LL + 1000000000LL) % 1000000000LL
    );

    const std::time_t raw = std::chrono::system_clock::to_time_t(result.Point);
    const std::tm calendar = convert_time(raw, zone);

    result.Date.Year = calendar.tm_year + 1900;
    result.Date.Month = calendar.tm_mon + 1;
    result.Date.Day = calendar.tm_mday;
    result.Date.Weekday = calendar.tm_wday;
    result.Date.Yearday = calendar.tm_yday;

    result.Time.Hour = calendar.tm_hour;
    result.Time.Minute = calendar.tm_min;
    result.Time.Second = calendar.tm_sec;
    result.Time.Nanosecond = nanosecond;

    if (zone == ZONE::UTC) {
        result.Zone_Name = "UTC";
        result.UTC_Offset = "+00:00";
    } else {
        result.Zone_Name = tm_field(calendar, "%Z");
        result.UTC_Offset = colonized_offset(tm_field(calendar, "%z"));
        if (result.Zone_Name.empty()) result.Zone_Name = "LOCAL";
    }
    return result;
}

std::string DATETIME::Format(const OPTIONS& options) const
{
    const unsigned digits = static_cast<unsigned>(options.Precision);

    if (options.Format == FORMAT::Unix) {
        const auto duration = Point.time_since_epoch();
        switch (options.Precision) {
            case PRECISION::Seconds:
                return std::to_string(
                    std::chrono::duration_cast<std::chrono::seconds>(duration).count()
                );
            case PRECISION::Milliseconds:
                return std::to_string(
                    std::chrono::duration_cast<std::chrono::milliseconds>(duration).count()
                );
            case PRECISION::Microseconds:
                return std::to_string(
                    std::chrono::duration_cast<std::chrono::microseconds>(duration).count()
                );
            case PRECISION::Nanoseconds:
                return std::to_string(
                    std::chrono::duration_cast<std::chrono::nanoseconds>(duration).count()
                );
        }
    }

    const std::string zone_iso = Zone == ZONE::UTC
        ? "Z"
        : (UTC_Offset.empty() ? Zone_Name : UTC_Offset);

    if (options.Format == FORMAT::ISO) {
        if (options.Scope == SCOPE::Date) return Date.ISO();
        if (options.Scope == SCOPE::Time) return Time.ISO(digits) + zone_iso;
        return Date.ISO() + 'T' + Time.ISO(digits) + zone_iso;
    }

    if (options.Format == FORMAT::Compact) {
        if (options.Scope == SCOPE::Date) return Date.Compact();
        if (options.Scope == SCOPE::Time) return Time.Compact(digits);
        return Date.Compact() + Time.Compact(digits);
    }

    const std::string precision = digits == 0
        ? std::string()
        : '.' + fraction(Time.Nanosecond, digits);
    if (options.Scope == SCOPE::Date) return Date.Compact();
    if (options.Scope == SCOPE::Time) {
        return Time.Compact(0) + precision + '.' + Zone_Name;
    }
    return Date.Compact() + '.' + Time.Compact(0) + precision + '.' + Zone_Name;
}

bool DATETIME::Write(
    const std::filesystem::path& requested_output,
    const std::string& value,
    bool append,
    bool create_directories,
    std::string& error
)
{
    error.clear();
    std::filesystem::path output = requested_output;
    std::error_code filesystem_error;

    if (std::filesystem::is_directory(output, filesystem_error)) {
        output /= "datetime.stamp";
    }

    const auto parent = output.parent_path();
    if (create_directories && !parent.empty()) {
        std::filesystem::create_directories(parent, filesystem_error);
        if (filesystem_error) {
            error = "could not create output directories: " +
                    filesystem_error.message();
            return false;
        }
    }

    const auto mode = std::ios::out | (append ? std::ios::app : std::ios::trunc);
    std::ofstream stream(output, mode);
    if (!stream) {
        error = "could not open output file: " + output.string();
        return false;
    }

    stream << value << '\n';
    if (!stream) {
        error = "could not write output file: " + output.string();
        return false;
    }
    return true;
}

} // namespace CHRONO

namespace {

constexpr std::string_view Version = "1.0.0";

void help()
{
    std::cout
        << "datetime " << Version << " - current date and time stamper\n\n"
        << "Usage:\n"
        << "  datetime [options]\n\n"
        << "Scope:\n"
        << "  --date                 Output only the date\n"
        << "  --time                 Output only the time\n"
        << "  --datetime             Output date and time (default)\n\n"
        << "Clock:\n"
        << "  --local                Use the system local zone (default)\n"
        << "  --utc                  Use UTC\n\n"
        << "Formatting:\n"
        << "  --format iso           ISO-style output (default)\n"
        << "  --format compact       Compact numeric output\n"
        << "  --format stamp         YYYYMMDD.HHMMSS.fraction.ZONE\n"
        << "  --format unix          Unix epoch value\n"
        << "  --precision seconds|milliseconds|microseconds|nanoseconds\n\n"
        << "Stamping:\n"
        << "  --output FILE          Write the timestamp to FILE\n"
        << "  --append               Append instead of replacing FILE\n"
        << "  --create-directories   Create missing parent directories\n"
        << "  --quiet                Suppress standard output\n\n"
        << "  --help, -h             Show help\n"
        << "  --version, -v          Show version\n";
}

bool parse_format(std::string_view value, CHRONO::FORMAT& output)
{
    if (value == "iso") output = CHRONO::FORMAT::ISO;
    else if (value == "compact") output = CHRONO::FORMAT::Compact;
    else if (value == "stamp") output = CHRONO::FORMAT::Stamp;
    else if (value == "unix") output = CHRONO::FORMAT::Unix;
    else return false;
    return true;
}

bool parse_precision(std::string_view value, CHRONO::PRECISION& output)
{
    if (value == "seconds") output = CHRONO::PRECISION::Seconds;
    else if (value == "milliseconds") output = CHRONO::PRECISION::Milliseconds;
    else if (value == "microseconds") output = CHRONO::PRECISION::Microseconds;
    else if (value == "nanoseconds") output = CHRONO::PRECISION::Nanoseconds;
    else return false;
    return true;
}

} // namespace

int main(int argument_count, char* arguments[])
{
    CHRONO::OPTIONS options;

    for (int index = 1; index < argument_count; ++index) {
        const std::string_view argument = arguments[index];
        if (argument == "--help" || argument == "-h") {
            help(); return 0;
        }
        if (argument == "--version" || argument == "-v") {
            std::cout << "datetime " << Version << '\n'; return 0;
        }
        if (argument == "--date") options.Scope = CHRONO::SCOPE::Date;
        else if (argument == "--time") options.Scope = CHRONO::SCOPE::Time;
        else if (argument == "--datetime") options.Scope = CHRONO::SCOPE::Date_Time;
        else if (argument == "--utc") options.Zone = CHRONO::ZONE::UTC;
        else if (argument == "--local") options.Zone = CHRONO::ZONE::Local;
        else if (argument == "--append") options.Append = true;
        else if (argument == "--quiet") options.Quiet = true;
        else if (argument == "--create-directories") options.Create_Directories = true;
        else if (argument == "--format") {
            if (++index >= argument_count ||
                !parse_format(arguments[index], options.Format)) {
                std::cerr << "datetime: invalid or missing format\n"; return 2;
            }
        } else if (argument == "--precision") {
            if (++index >= argument_count ||
                !parse_precision(arguments[index], options.Precision)) {
                std::cerr << "datetime: invalid or missing precision\n"; return 2;
            }
        } else if (argument == "--output") {
            if (++index >= argument_count) {
                std::cerr << "datetime: missing output path\n"; return 2;
            }
            options.Output = arguments[index];
        } else {
            std::cerr << "datetime: unknown option: " << argument << '\n'
                      << "Try 'datetime --help' for usage.\n";
            return 2;
        }
    }

    const CHRONO::DATETIME current = CHRONO::DATETIME::Now(options.Zone);
    const std::string value = current.Format(options);

    if (!options.Output.empty()) {
        std::string error;
        if (!CHRONO::DATETIME::Write(
                options.Output, value, options.Append,
                options.Create_Directories, error)) {
            std::cerr << "datetime: " << error << '\n'; return 3;
        }
    }
    if (!options.Quiet) std::cout << value << '\n';
    return 0;
}
