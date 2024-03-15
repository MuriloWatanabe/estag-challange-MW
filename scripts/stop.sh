#!/bin/bash
set -e

pushd $(dirname $0) > /dev/null

cd ..
docker compose down

popd > /dev/null