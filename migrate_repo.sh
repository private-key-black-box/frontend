#!/bin/sh

## A script to automate pulling changes over from our other repo, `protokit`, into this `frontend` repo


cd ../protokit/

cp -r packages/ ../frontend/packages
