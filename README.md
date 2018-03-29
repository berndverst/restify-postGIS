# Map of National Parks and Historic Sites 
*powered by RESTify, PostGIS, and Leaflet maps*

A basic instant mapping demo using PostGIS, node-restify, LeafLet Maps and map tiles from Stamen, to visualize the locations of major National Parks and Historic Sites.

<a href='http://nodegis-shifter.rhcloud.com/'><img src='https://www.openshift.com/sites/default/files/Parks_preview.png'/></a>

## Running locally in Docker with managed Azure PostgreSQL

### Dependencies
1. Create a managed PostgreSQL database on Azure with the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
    ```bash
    # This snippet uses Azure Resource Group 'devtour2018postgres'
    # in region 'eastus' with a General Purpose Generation 4 2-core instance

    read SERVER_NAME
    read DB_ADMIN_USER
    read -s DB_PASS

    az postgres server create --resource-group devtour2018postgres \
    --location eastus --name $SERVER_NAME --admin-user $DB_ADMIN_USER \
    --admin-password $DB_PASS --sku-name GP_Gen4_2 --ssl-enforcement Enabled
    ```
1. Add a firewall rule to make the server publicly accessible
    ```bash
    az postgres server firewall-rule create --resource-group devtour2018postgres \
    --server-name $SERVER_NAME --start-ip-address=0.0.0.0 \
    --end-ip-address=255.255.255.255 --name AllowAllIPs
    ```
1. Create the `parks` database on your server
    ```bash
    az postgres db create --resource-group devtour2018postgres \
    --server-name $SERVER_NAME --name parks
    ```
1. Verify the datbase connection with the standard `psql` CLI tool.
    ```bash
    psql -h $SERVER_NAME.database.windows.net \
    -U $DB_ADMIN_USER@$SERVER_NAME parks
    ```

### Initialize database with data

```bash
DB_SERVER=devtour2018
DB_USER="bernd@$DB_SERVER"
DB_PORT=5432
read -s DB_PASSWD

docker run -it -e DBUSER=$DB_USER -e DBPASS=$DB_PASSWD \
-e DBPORT=$DB_PORT -e DBSERVER="$DB_SERVER.database.windows.net" \
berndverst/node-postgis-azure initdb
```

### Run the app

```bash
docker run -it -e DBUSER=$DB_USER -e DBPASS=$DB_PASSWD \
-e DBPORT=$DB_PORT -e DBSERVER="$DB_SERVER.database.windows.net" \
-p 8080:8080 berndverst/node-postgis-azure
```

The app will be available at http://localhost:8080.

## License
This code is dedicated to the public domain to the maximum extent permitted by applicable law, pursuant to CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
