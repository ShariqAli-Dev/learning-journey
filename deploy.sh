#!/bin/bash

echo What should the version be?
read VERSION

docker build -t shariqalidev/learning-journey:$VERSION .
docker push shariqalidev/learning-journey:$VERSION