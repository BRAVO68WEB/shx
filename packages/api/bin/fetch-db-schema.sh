#!/bin/bash

source .env
FILE=dbdump/dump.sql
rm -rf $FILE
pg_dump -d $DATABASE_URL > $FILE