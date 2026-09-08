#/bin/bash

pnpm config set registry=https://registry.npmjs.org/
pnpm config set //registry.npmjs.org/:_authToken $NPM_TOKEN

echo "Reading branch $BRANCH_NAME"

if [ "$BRANCH_NAME" = "main" ]; then
    pnpm run publish
elif [ "$BRANCH_NAME" = "dev" ]; then
    pnpm run publish:dev
fi