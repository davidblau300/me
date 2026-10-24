#!/usr/bin/env bash
# Build "me" and publish dist/ to the gh-pages branch, which GitHub Pages serves at
# https://davidblau300.github.io/me/. Only build output goes to gh-pages; its history is replaced on each deploy.
set -euo pipefail

readonly REPO_URL='https://github.com/davidblau300/me.git'
readonly PAGES_BRANCH='gh-pages'
readonly AUTHOR_NAME='David Blau'
readonly AUTHOR_EMAIL='33342560+davidblau300@users.noreply.github.com'
# Push with the personal github.com login held by gh; leaves global git config (work setup) untouched.
readonly CREDENTIAL_HELPER='!gh auth git-credential'

cd "$(dirname "$0")/.."

if [[ -n "$(git status --porcelain)" ]]; then
  echo "deploy: working tree not clean — commit first so the deployed build matches a commit" >&2
  exit 1
fi

npm test
npm run build

source_commit="$(git rev-parse --short HEAD)"
publish_dir="$(mktemp -d)"
trap 'rm -rf "$publish_dir"' EXIT

cp -R dist/. "$publish_dir"
touch "$publish_dir/.nojekyll"

git -C "$publish_dir" init -q -b "$PAGES_BRANCH"
git -C "$publish_dir" add -A
git -C "$publish_dir" -c user.name="$AUTHOR_NAME" -c user.email="$AUTHOR_EMAIL" \
  commit -q -m "deploy: build of ${source_commit}"
git -C "$publish_dir" -c credential.helper= -c credential.helper="$CREDENTIAL_HELPER" \
  push -q --force "$REPO_URL" "$PAGES_BRANCH"

echo "deploy: published ${source_commit} to ${PAGES_BRANCH}"
