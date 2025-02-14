#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <inputImagePath> <outputDir>"
  exit 1
fi

# Assign arguments to variables
inputImagePath=$1
outputDir=$2

# Run the JavaScript file with node, passing the arguments
node generateResizedImages.mjs "$inputImagePath" "$outputDir"