#!/bin/bash
set -e

pushd $(dirname $0) > /dev/null

ID=$(docker inspect --format="{{.Id}}" node_desafio)

docker exec -it $ID bash -c "npm install $1 --save-dev";

popd > /dev/null