#ifndef EXIT_HPP
#define EXIT_HPP
namespace DOMAIN {
class EXIT {
public:
    enum CODE { Success = 0, Invalid = 2, Storage = 3, Network = 4, Conflict = 5 };
};
}
#endif
