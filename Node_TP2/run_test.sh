#!/usr/bin/env bash


node --harmony --use_strict server/index.js >> server.log &
server_pid=$!
test/node_modules/.bin/jasmine-node --verbose test/
kill -9 $server_pid
