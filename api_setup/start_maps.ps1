$ErrorActionPreference = "Stop"

$RepoRoot = "C:\Bock Internship\projects\Bockone\2\entry point\BockOneUI"
$OpenMapTilesDir = Join-Path $RepoRoot "BockMapsServer\openmaptiles"
$NginxConf = Join-Path $RepoRoot "BockMapsServer\api_setup\nginx.conf"
$GeoDataDir = $env:GEOFABRIK_DATA_DIR
if (-not $GeoDataDir) {
    $GeoDataDir = Join-Path $RepoRoot "BockMapsServer\osrm_server\data"
}

$ProjectName = "openmaptiles"
# docker-compose.yml defines explicit network "postgres", so compose creates "openmaptiles_postgres"
$NetworkName = "${ProjectName}_postgres"

Write-Host "Starting OpenMapTiles via docker compose..."
Push-Location $OpenMapTilesDir
docker compose -p $ProjectName up -d
Pop-Location

Write-Host "Starting Redis on network $NetworkName..."
docker rm -f map-redis | Out-Null
docker run -d --name map-redis --network $NetworkName redis | Out-Null

Write-Host "Seeding API key in Redis..."
docker exec -it map-redis redis-cli SET api_key:myfirstkey "active" | Out-Null
docker exec -it map-redis redis-cli SET usage:myfirstkey 0 | Out-Null

Write-Host "Starting OpenResty gateway on port 8081..."
docker rm -f map-openresty | Out-Null
docker run -d --name map-openresty --add-host host.docker.internal:host-gateway --network $NetworkName -p 8081:80 -v "${NginxConf}:/usr/local/openresty/nginx/conf/nginx.conf:ro" openresty/openresty:alpine | Out-Null

Write-Host "Skipping default Nominatim container (use imported Southern Zone dataset instead)."
Write-Host "See: BockMapsServer\nominatim_server\readme.md"

$OsrmFile = Join-Path $GeoDataDir "southern-zone-latest.osrm"
if (Test-Path $OsrmFile) {
    Write-Host "Starting OSRM on port 5000 from $OsrmFile ..."
    docker rm -f osrm-server | Out-Null
    docker run -d --name osrm-server -p 5000:5000 -v "${GeoDataDir}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/southern-zone-latest.osrm | Out-Null
} else {
    Write-Host "OSRM data not found at $OsrmFile"
    Write-Host "Build it first using: BockMapsServer\osrm_server\readme.md"
}

Write-Host ""
Write-Host "Done. Test the gate:"
Write-Host "  curl.exe -I ""http://127.0.0.1:8081/styles/basic-preview/0/0/0.png?key=myfirstkey"""
