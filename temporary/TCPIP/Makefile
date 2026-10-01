CXX ?= g++
CPPFLAGS ?=
CXXFLAGS ?= -std=c++17 -O2 -Wall -Wextra -Wpedantic
LDFLAGS ?=
LDLIBS ?=

TARGET := tcpip
SOURCE := tcpip.cpp
HEADERS := allow.hpp client.hpp deny.hpp firewall.hpp fqdn.hpp gateway.hpp \
	globalhost.hpp group.hpp host.hpp hostname.hpp hosts.hpp internet.hpp \
	ip.hpp localhost.hpp mac.hpp map.hpp network.hpp port.hpp proxy.hpp \
	receive.hpp route.hpp router.hpp send.hpp server.hpp tcp.hpp tcpip.hpp udp.hpp
OBJECT := tcpip.o
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
	./$(TARGET) validate ip 127.0.0.1 | grep -qx 'valid IPv4 loopback'
	./$(TARGET) validate ip ::1 | grep -qx 'valid IPv6 loopback'
	./$(TARGET) validate hostname espoo02 | grep -qx valid
	./$(TARGET) validate fqdn example.com | grep -qx valid
	./$(TARGET) validate mac 02:00:5E:10:00:00 | grep -qx 'valid locally-administered unicast'
	./$(TARGET) validate port 443 | grep -qx 'valid privileged'
	./$(TARGET) policy deny 127.0.0.1 80 tcp | grep -qx deny

test: check

install: $(TARGET)
	install -d "$(DESTDIR)$(BINDIR)"
	install -m 0755 $(TARGET) "$(DESTDIR)$(BINDIR)/$(TARGET)"

uninstall:
	rm -f "$(DESTDIR)$(BINDIR)/$(TARGET)"

clean:
	rm -f $(TARGET) $(OBJECT) $(OBJECT:.o=.d)

rebuild: clean all
