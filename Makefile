#! Makefile
# Author: Trung-Tin Pham

all: ;clean build

build: ;yarn tsc:webpack

clean: ;rm -rf build dist public *.zip

run: ;docker run --rm --name be -p 443:433 -d procon-server:0.0

.PHONY: clean build