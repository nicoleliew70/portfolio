#!/bin/bash
# Quick deploy script — git add, commit, and push in one command
# Usage: ./deploy.sh "your commit message"

MSG="${1:-update portfolio}"

git add -A
git commit -m "$MSG"
git pull --rebase origin main
git push origin main

echo "✅ Pushed! Your hosting provider (GitHub Actions/Cloudflare Pages) will auto-deploy the latest changes."
