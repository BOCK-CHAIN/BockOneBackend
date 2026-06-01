## To setup API feature to map application

1. Use `BockMapsServer/openmaptiles/docker-compose.yml` to bring up the tileserver
2. Ensure the India mbtiles file exists at:
   - `BockMapsServer/openmaptiles/osm-2020-02-10-v3.11_asia_india.mbtiles`
   - This file is mounted into `tileserver-gl` and served through OpenResty.
3. For Nominatim + OSRM data, use Geofabrik Southern Zone:
   - `https://download.geofabrik.de/asia/india/southern-zone-latest.osm.pbf`
4. Set up this API gateway using docker
```bash
docker pull openresty/openresty:alpine
docker pull redis
docker run -d --name map-redis --network openmaptiles_postgres redis
```
5. then start redis-cli using this docker command `docker exec -it map-redis redis-cli`
6. then run the following command in redis-cli
```bash
SET api_key:myfirstkey "active"
SET usage:myfirstkey 0
EXIT
```
7. finally run openresty in docker pointing it to nginx.conf file
```bash
docker run -d --name map-openresty --add-host host.docker.internal:host-gateway --network openmaptiles_postgres -p 8081:80 -v /absolute/path/to/BockMapsServer/api_setup/nginx.conf:/usr/local/openresty/nginx/conf/nginx.conf openresty/openresty:alpine
```
8. then u can access the map server using url like this `http://localhost:8081/styles/basic-preview/{z}/{x}/{y}.png?key=myfirstkey`

Port note:
- `tileserver-gl` host port comes from `BockMapsServer/openmaptiles/.env` (`TPORT`).
- This repo defaults `TPORT=8084` to avoid common `8080` conflicts.
- Keep `api_setup/nginx.conf` `proxy_pass` port in sync with `TPORT`.

App `.env` values:
```env
MAPTILESERVER_URL=http://localhost:8081/styles/basic-preview/{z}/{x}/{y}.png?key=myfirstkey
NOMINATIM_URL=http://127.0.0.1:8082
OSRM_URL=http://127.0.0.1:5000
```

Notes:
- With this repo, compose creates `openmaptiles_postgres` (network name comes from `networks: postgres` in docker-compose).
- If your compose project name is different, replace the network name accordingly.
