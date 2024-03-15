#!/bin/bash
set -e

pushd $(dirname $0) > /dev/null

cd ..
docker compose down
docker compose up -d --force-recreate

popd > /dev/null