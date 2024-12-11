$manifest = Get-Content .\manifest.json | ConvertFrom-Json
$ver = $manifest.version -as [string]
$name = $manifest.name + $ver
if (-not (Test-Path "dist" -PathType Container)) {
    New-Item -Path "dist" -ItemType Directory > $null
}
Get-ChildItem -Include "src", "manifest.json" -Recurse | Compress-Archive -DestinationPath "dist/$name.xpi" -Force