## OSRM setup (Geofabrik Southern Zone)

Download source data:
```bash
mkdir -p ~/nominatim-project/data
cd ~/nominatim-project/data
wget -O southern-zone-latest.osm.pbf https://download.geofabrik.de/asia/india/southern-zone-latest.osm.pbf
```

Build OSRM data files:
```bash
docker run -t -v "$PWD:/data" osrm/osrm-backend osrm-extract -p /opt/car.lua /data/southern-zone-latest.osm.pbf
docker run -t -v "$PWD:/data" osrm/osrm-backend osrm-partition /data/southern-zone-latest.osrm
docker run -t -v "$PWD:/data" osrm/osrm-backend osrm-customize /data/southern-zone-latest.osrm
```

Run OSRM server:
```bash
docker rm -f osrm-server 2>$null | Out-Null
docker run -d --name osrm-server -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/southern-zone-latest.osrm

```

App env value:
```env
OSRM_URL=http://127.0.0.1:5000
```
