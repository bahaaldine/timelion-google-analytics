#!/bin/bash

git push && git tag -d $1 && git push --delete origin $1 && git tag -a $1 -m "version $1" && git push origin $1