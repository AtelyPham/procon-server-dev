#! Makefile
# Author: Trung-Tin Pham

all: ;clean build

build: ;yarn install && \
				npx tsc && \
				yarn webpack  && \
				docker build -t procon-server:0.0-prod -f Dockerfile.production .
clean: ;rm -rf build; rm -rf dist; rm -rf node_modules

run: ;docker run --rm --name procon-server -p2303:2303 -d procon-server:0.0-prod

.PHONY: clean build