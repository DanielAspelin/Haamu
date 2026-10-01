CXX ?= g++
CPPFLAGS ?=
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic
LDFLAGS ?=
LDLIBS ?=

TARGET := datetime
SOURCE := datetime.cpp
HEADERS := datetime.hpp date.hpp time.hpp
OBJECT := datetime.o
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
	./$(TARGET) --utc --date --format iso | grep -Eq '^[0-9]{4}-[0-9]{2}-[0-9]{2}$$'
	./$(TARGET) --utc --time --format compact | grep -Eq '^[0-9]{6}$$'
	./$(TARGET) --utc --format stamp --precision nanoseconds | grep -Eq '^[0-9]{8}\.[0-9]{6}\.[0-9]{9}\.UTC$$'
	./$(TARGET) --format unix | grep -Eq '^[0-9]+$$'
	./$(TARGET) --utc --output .datetime.test --quiet
	test -s .datetime.test
	rm -f .datetime.test

test: check

install: $(TARGET)
	install -d "$(DESTDIR)$(BINDIR)"
	install -m 0755 $(TARGET) "$(DESTDIR)$(BINDIR)/$(TARGET)"

uninstall:
	rm -f "$(DESTDIR)$(BINDIR)/$(TARGET)"

clean:
	rm -f $(TARGET) $(OBJECT) $(OBJECT:.o=.d) .datetime.test

rebuild: clean all
