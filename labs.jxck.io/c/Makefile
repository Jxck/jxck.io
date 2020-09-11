CC = gcc
CFLAGS = -g -Wall
OBJS = src/hello.o src/print.o
# PROGRAM = hello
.SUFFIXES: .c .o

all: hello

.c.o:
	$(CC) $(CFLAGS) -c $< -o $@

hello: $(OBJS)
	$(CC) -o hello $^

print.o: print.h

.PHONY: clean
clean:
	$(RM) hello $(OBJS)
