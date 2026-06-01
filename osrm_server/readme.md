## OSRM setup — Bengaluru-only extract

Uses a clipped Bengaluru metro region from the Geofabrik Southern Zone extract.
Covers: Bengaluru city, Whitefield, Electronic City, Kempegowda Airport, Outer Ring Road.

**Bounding box**: `77.35,12.75,77.85,13.35`

---

### Option A — Pre-clipped PBF via Docker (recommended)

Build the pre-processing image (downloads Southern Zone → clips → extracts → partitions → customizes):

```bash
docker build -t osrm-bengaluru:latest .
```

Run the routing server:

```bash
docker run -d --name osrm-bengaluru -p 5000:5000 osrm-bengaluru:latest
```

---

### Option B — Manual processing on host

**1. Download Southern Zone PBF** (527 MB)

```bash
mkdir -p osrm-data && cd osrm-data
wget https://download.geofabrik.de/asia/india/southern-zone-latest.osm.pbf
```

**2. Clip to Bengaluru metro region** (reduces to ~20-30 MB)

```bash
docker run --rm -v "$PWD:/data" ghcr.io/osmcode/osmium-tool:latest \
  osmium extract -b 77.35,12.75,77.85,13.35 \
  /data/southern-zone-latest.osm.pbf \
  -o /data/bengaluru.osm.pbf

rm southern-zone-latest.osm.pbf
```

**3. Extract / Partition / Customize**

```bash
docker run --rm -t -v "$PWD:/data" osrm/osrm-backend:v5.25.0 \
  osrm-extract -p /opt/car.lua /data/bengaluru.osm.pbf

docker run --rm -t -v "$PWD:/data" osrm/osrm-backend:v5.25.0 \
  osrm-partition /data/bengaluru.osrm

docker run --rm -t -v "$PWD:/data" osrm/osrm-backend:v5.25.0 \
  osrm-customize /data/bengaluru.osrm

rm -f bengaluru.osm.pbf
```

**4. Run OSRM server**

```bash
docker run -d --name osrm-server -p 5000:5000 \
  -v "$PWD:/data" \
  osrm/osrm-backend:v5.25.0 \
  osrm-routed --algorithm mld /data/bengaluru.osrm
```

---

### Option C — Direct test without building

```bash
# Start a throwaway container with the pre-built pipeline
docker run --rm -p 5000:5000 madhavkeshava/osrm-bengaluru:latest
```

---

### Resource estimates

| Metric | Bengaluru-only | India-wide | Southern Zone |
|--------|---------------|------------|---------------|
| PBF download | 527 MB (Southern) → clips to ~25 MB | 1.6 GB | 527 MB |
| Processed OSRM | ~250 MB | ~8 GB | ~4 GB |
| RAM (preprocess) | ~4 GB | ~60 GB | ~24 GB |
| RAM (serve) | 512 MiB – 1 GiB | 8 GiB+ | 4 GiB+ |
| Disk (PVC) | 5 GiB | 30 GiB | 15 GiB |
| K8s CPU (serve) | 250m–500m | 500m–2000m | 500m–1000m |

---

### Route test coordinates

| Route | Origin | Destination |
|-------|--------|-------------|
| MG Road → Whitefield | 12.9716,77.5946 | 12.9698,77.7500 |
| Airport → MG Road | 13.1986,77.7066 | 12.9716,77.5946 |
| Electronic City → Koramangala | 12.8399,77.6770 | 12.9352,77.6245 |
| Whitefield → Hebbal | 12.9698,77.7500 | 13.0358,77.5970 |

Test with curl:

```bash
curl -s "http://localhost:5000/route/v1/driving/77.5946,12.9716;77.7500,12.9698?overview=full" | jq .
```

---

### App env values

```env
OSRM_HOST=osrm-service
OSRM_PORT=5000
OSRM_TIMEOUT=20000
OSRM_RETRIES=3
```
