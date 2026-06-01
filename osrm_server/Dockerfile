FROM osrm/osrm-backend:v5.25.0 AS builder

WORKDIR /data

RUN apt-get update && apt-get install -y osmium-tool wget && rm -rf /var/lib/apt/lists/*

RUN wget --progress=dot:giga -O southern-zone-latest.osm.pbf \
  "https://download.geofabrik.de/asia/india/southern-zone-latest.osm.pbf"

RUN osmium extract \
  -b 77.35,12.75,77.85,13.35 \
  southern-zone-latest.osm.pbf \
  -o bengaluru.osm.pbf

RUN rm -f southern-zone-latest.osm.pbf

RUN osrm-extract -p /opt/car.lua bengaluru.osm.pbf
RUN osrm-partition bengaluru.osrm
RUN osrm-customize bengaluru.osrm
RUN rm -f bengaluru.osm.pbf

FROM osrm/osrm-backend:v5.25.0
COPY --from=builder /data/bengaluru.osrm* /data/
EXPOSE 5000
CMD ["osrm-routed", "--algorithm", "mld", "/data/bengaluru.osrm", "--port", "5000"]
