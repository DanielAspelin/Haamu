#ifndef TLD_HPP
#define TLD_HPP
#include <string>
#include <string_view>
namespace DOMAIN {
class TLD {
public:
    TLD() = default;
    explicit TLD(std::string value);
    static bool Validate(std::string_view value) noexcept;
    bool Is_Valid() const noexcept;
    const std::string& Value() const noexcept;
private:
    std::string Name;
    bool Valid { false };
};
}
#endif
