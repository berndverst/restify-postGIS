#!/bin/sh

export POSTGRESQL_DB_URL="postgres://$DBUSER:$DBPASS@$DBSERVER:$DBPORT?ssl=true"

var="npm run $@"
exec $var
