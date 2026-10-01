CXX ?= g++
CPPFLAGS ?=
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic
LDFLAGS ?=
LDLIBS ?=

TARGET := ascii
SOURCE := ascii.cpp
HEADER := ascii.hpp
OBJECT := ascii.o
PREFIX ?= /usr/local
BINDIR ?= $(PREFIX)/bin
DESTDIR ?=

.PHONY: all debug check test install uninstall clean rebuild

all: $(TARGET)

$(TARGET): $(OBJECT)
	$(CXX) $(LDFLAGS) $^ $(LDLIBS) -o $@

$(OBJECT): $(SOURCE) $(HEADER)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) -MMD -MP -c $< -o $@

-include $(OBJECT:.o=.d)

debug: CXXFLAGS := -std=c++17 -O0 -g3 -Wall -Wextra -Wpedantic
debug: clean $(TARGET)

check: $(TARGET)
	./$(TARGET) inspect A >/dev/null
	./$(TARGET) classify 65 | grep -qx uppercase
	./$(TARGET) encode ASCII | grep -qx '65 83 67 73 73'
	./$(TARGET) decode 65 83 67 73 73 | grep -qx ASCII

test: check

install: $(TARGET)
	install -d "$(DESTDIR)$(BINDIR)"
	install -m 0755 $(TARGET) "$(DESTDIR)$(BINDIR)/$(TARGET)"

uninstall:
	rm -f "$(DESTDIR)$(BINDIR)/$(TARGET)"

clean:
	rm -f $(TARGET) $(OBJECT) $(OBJECT:.o=.d)

rebuild: clean all