#!/bin/bash

mkdir -p ./build

# Typescript
./node_modules/.bin/tsc

# Browserify
browserify build/main.js > ./bundle.js

rm -rf ./build
