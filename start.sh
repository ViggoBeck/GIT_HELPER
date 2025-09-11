#!/bin/bash

echo "🚀 Starting Local Git Explorer..."
echo "📁 Current directory: $(pwd)"
echo "🔍 Checking if this is a git repository..."

if [ -d ".git" ]; then
	echo "✅ Git repository detected!"
else
	echo "⚠️  Not a git repository, but app will still work"
fi

echo "🌐 Starting server..."
node app.js