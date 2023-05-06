#!/bin/bash

source .env
FILE=graphql/schema.graphql
rm -rf $FILE
yarn gq $HASURA_GRAPHQL_ENDPOINT/v1/graphql -H "X-Hasura-Admin-Secret: $HASURA_GRAPHQL_ADMIN_SECRET" --introspect > $FILE
tail -n +2 "$FILE" > "$FILE.tmp" && mv "$FILE.tmp" "$FILE"