#!/bin/bash
# Quick deploy script — git add, commit, and push in one command
# Usage: ./deploy.sh "your commit message"

MSG="${1:-update portfolio}"

git add -A
git commit -m "$MSG"
git push origin main

echo "✅ Pushed! GitHub Actions will auto-deploy to GitHub Pages."
