CXX ?= g++
CPPFLAGS ?=
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic
LDFLAGS ?=
LDLIBS ?=

TARGET := symbol
SOURCE := symbol.cpp
HEADERS := symbol.hpp metasymbol.hpp newsymbol.hpp symbolattribute.hpp \
	symbolcharacter.hpp symbolescape.hpp symbolnumber.hpp symboltable.hpp
OBJECT := symbol.o
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
	./$(TARGET) inspect A | grep -qx 'Name: LATIN_CAPITAL_A'
	./$(TARGET) inspect U+20AC | grep -qx 'Character: €'
	./$(TARGET) escape 'A€' | grep -Fqx 'A\u20AC'
	./$(TARGET) unescape 'A\u20AC' | grep -qx 'A€'
	./$(TARGET) find PLUS | grep -qx 'Character: +'

test: check

install: $(TARGET)
	install -d "$(DESTDIR)$(BINDIR)"
	install -m 0755 $(TARGET) "$(DESTDIR)$(BINDIR)/$(TARGET)"

uninstall:
	rm -f "$(DESTDIR)$(BINDIR)/$(TARGET)"

clean:
	rm -f $(TARGET) $(OBJECT) $(OBJECT:.o=.d)

rebuild: clean all
