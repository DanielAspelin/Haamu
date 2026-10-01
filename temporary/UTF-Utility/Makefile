CXX ?= g++
CPPFLAGS ?=
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic
LDFLAGS ?=
LDLIBS ?=

TARGET := utf
SOURCE := utf.cpp
HEADERS := utf.hpp utf8.hpp utf16.hpp utf32.hpp
OBJECT := utf.o
PREFIX ?= /usr/local
BINDIR ?= $(PREFIX)/bin
DESTDIR ?=

.PHONY: all debug check test install uninstall clean rebuild

all: $(TARGET)

$(TARGET): $(OBJECT)
	$(CXX) $(LDFLAGS) $^ $(LDLIBS) -o $@

$(OBJECT): $(SOURCE) $(HEADERS)
	$(CXX) $(CPPFLAGS) $(CXXFLAGS) -MMD -MP -c $< -o $@

-include $(OBJECT:.o=.d)

debug: CXXFLAGS := -std=c++17 -O0 -g3 -Wall -Wextra -Wpedantic
debug: clean $(TARGET)

check: $(TARGET)
	./$(TARGET) validate utf8 ASCII | grep -qx valid
	./$(TARGET) codepoints ASCII | grep -qx 'U+0041 U+0053 U+0043 U+0049 U+0049'
	./$(TARGET) encode U+0041 U+0053 U+0043 U+0049 U+0049 | grep -qx ASCII
	./$(TARGET) units utf16 A | grep -qx '0x0041'
	./$(TARGET) units utf32 A | grep -qx '0x00000041'

test: check

install: $(TARGET)
	install -d "$(DESTDIR)$(BINDIR)"
	install -m 0755 $(TARGET) "$(DESTDIR)$(BINDIR)/$(TARGET)"

uninstall:
	rm -f "$(DESTDIR)$(BINDIR)/$(TARGET)"

clean:
	rm -f $(TARGET) $(OBJECT) $(OBJECT:.o=.d)

rebuild: clean all
