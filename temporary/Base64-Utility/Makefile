CXX ?= g++
CPPFLAGS ?=
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic
LDFLAGS ?=
LDLIBS ?=

TARGET := base64
SOURCE := base64.cpp
HEADER := base64.hpp
OBJECT := base64.o
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
	./$(TARGET) encode --text hello | grep -qx 'aGVsbG8='
	./$(TARGET) decode --text aGVsbG8= | grep -qx hello
	./$(TARGET) encode --url-safe --text '~~~' | grep -qx 'fn5-'
	./$(TARGET) decode --url-safe --text fn5- | grep -qx '~~~'
	./$(TARGET) encode --no-padding --text test | grep -qx 'dGVzdA'
	./$(TARGET) decode --ignore-whitespace --text 'aGVs bG8=' | grep -qx hello
	./$(TARGET) encode --text binary --output .base64.test
	./$(TARGET) decode --input .base64.test --output .base64.decoded
	cmp -s .base64.decoded /dev/stdin </dev/null || grep -qx binary .base64.decoded
	rm -f .base64.test .base64.decoded

test: check

install: $(TARGET)
	install -d "$(DESTDIR)$(BINDIR)"
	install -m 0755 $(TARGET) "$(DESTDIR)$(BINDIR)/$(TARGET)"

uninstall:
	rm -f "$(DESTDIR)$(BINDIR)/$(TARGET)"

clean:
	rm -f $(TARGET) $(OBJECT) $(OBJECT:.o=.d) .base64.test .base64.decoded

rebuild: clean all
