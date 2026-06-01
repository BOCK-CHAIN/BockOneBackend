$ErrorActionPreference = "Stop"

$ProjectName = "openmaptiles"

Write-Host "Stopping OpenResty, Redis, OSRM, and Nominatim..."
docker rm -f map-openresty map-redis osrm-server nominatim | Out-Null

Write-Host "Stopping OpenMapTiles docker compose..."
docker compose -p $ProjectName down

Write-Host "Done."
