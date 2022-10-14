#!/bin/bash

# Create cert for localhost dev
mkdir -p certs
pushd certs
mkcert  -cert-file localhost.pem -key-file localhost-key.pem localhost 127.0.0.1
popd