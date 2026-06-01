## Nominatim setup (Geofabrik Southern Zone)

Use the same extract as OSRM:
```bash
mkdir -p ~/nominatim-project/data
cd ~/nominatim-project/data
wget -O southern-zone-latest.osm.pbf https://download.geofabrik.de/asia/india/southern-zone-latest.osm.pbf
```

Project and DB setup:
```bash
sudo apt update
sudo apt install -y build-essential pkg-config libicu-dev python3-dev python3-venv libpq-dev postgresql postgresql-contrib postgis osm2pgsql

mkdir -p ~/nominatim-project
cd ~/nominatim-project
sudo -u postgres createuser -s nominatim || true
sudo -u postgres createdb -E UTF8 -O nominatim nominatim || true
sudo -u postgres psql -d nominatim -c "CREATE EXTENSION IF NOT EXISTS postgis;"
sudo -u postgres psql -d nominatim -c "CREATE EXTENSION IF NOT EXISTS hstore;"
```

Install and import:
```bash
cd ~/nominatim-project
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install nominatim-db nominatim-api SQLAlchemy asyncpg falcon uvicorn
nominatim import --osm-file ~/nominatim-project/data/southern-zone-latest.osm.pbf
```

Run service on port `8082` (matches app default):
```bash
source ~/nominatim-project/venv/bin/activate
nominatim serve --server 0.0.0.0:8082
```

App env value:
```env
NOMINATIM_URL=http://127.0.0.1:8082
```
