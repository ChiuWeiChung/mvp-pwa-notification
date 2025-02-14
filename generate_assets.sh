#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <inputImagePath> <outputDir>"
  exit 1
fi

# Assign arguments to variables
inputImagePath=$1
outputDir=$2

# Run the JavaScript file to generate resized images
node generateResizedImages.mjs "$inputImagePath" "$outputDir"

# Run the JavaScript file to generate the manifest
node generateManifest.mjs "$outputDir"

echo "Assets generation completed." 