CXX ?= g++
CPPFLAGS ?=
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic
LDFLAGS ?=
LDLIBS ?=

TARGET := domain
SOURCE := domain.cpp
HEADERS := $(wildcard *.hpp)
OBJECT := domain.o
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
	./$(TARGET) validate domain example.com | grep -qx valid
	./$(TARGET) validate tld com | grep -qx valid
	./$(TARGET) validate subdomain api.v1 | grep -qx valid
	./$(TARGET) validate url https://www.example.com:443/path?q=1 | grep -qx valid
	./$(TARGET) inspect https://example.com/path | grep -qx 'domain=example.com'
	./$(TARGET) add example.com --root /srv/example --https --registry .domain.test
	./$(TARGET) list --registry .domain.test | awk -F '\t' '$$1 == "example.com" && $$2 == "/srv/example" && $$3 == "80" && $$4 == "443" && $$5 == "http,https" { found = 1 } END { exit !found }'
	./$(TARGET) remove example.com --registry .domain.test
	test ! -s .domain.test
	rm -f .domain.test .domain.test.tmp

test: check

install: $(TARGET)
	install -d "$(DESTDIR)$(BINDIR)"
	install -m 0755 $(TARGET) "$(DESTDIR)$(BINDIR)/$(TARGET)"

uninstall:
	rm -f "$(DESTDIR)$(BINDIR)/$(TARGET)"

clean:
	rm -f $(TARGET) $(OBJECT) $(OBJECT:.o=.d) .domain.test .domain.test.tmp

rebuild: clean all
