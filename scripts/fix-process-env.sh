#!/bin/bash

# TODO: how to make vite do this automatically for lib mode?
sed s/process.env.NODE_ENV/\"development\"/g dist/mfe-beam.js > tmp
mv tmp dist/mfe-beam.js