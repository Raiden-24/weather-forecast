# Weather App - Prepare and Push to GitHub
Write-Host "Weather App - GitHub Push Preparation" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Backup old files
Write-Host "Step 1: Creating backup..." -ForegroundColor Yellow
$backupDir = ".\backup-old-files"
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

if (Test-Path "script.js") {
    Copy-Item "script.js" "$backupDir\script.js" -Force
    Write-Host "  Backed up: script.js" -ForegroundColor Green
}

# Step 2: Rename improved files
Write-Host ""
Write-Host "Step 2: Renaming improved files..." -ForegroundColor Yellow

if (Test-Path "index-improved.html") {
    if (Test-Path "index.html") { Remove-Item "index.html" -Force }
    Rename-Item "index-improved.html" "index.html" -Force
    Write-Host "  Renamed: index-improved.html -> index.html" -ForegroundColor Green
}

if (Test-Path "styles-improved.css") {
    if (Test-Path "styles.css") { Remove-Item "styles.css" -Force }
    Rename-Item "styles-improved.css" "styles.css" -Force
    Write-Host "  Renamed: styles-improved.css -> styles.css" -ForegroundColor Green
}

if (Test-Path "README-IMPROVED.md") {
    if (Test-Path "README.md") { Remove-Item "README.md" -Force }
    Rename-Item "README-IMPROVED.md" "README.md" -Force
    Write-Host "  Renamed: README-IMPROVED.md -> README.md" -ForegroundColor Green
}

if (Test-Path "package-improved.json") {
    if (Test-Path "package.json") { Remove-Item "package.json" -Force }
    Rename-Item "package-improved.json" "package.json" -Force
    Write-Host "  Renamed: package-improved.json -> package.json" -ForegroundColor Green
}

# Step 3: Delete old script.js
Write-Host ""
Write-Host "Step 3: Cleaning up..." -ForegroundColor Yellow
if (Test-Path "script.js") {
    Remove-Item "script.js" -Force
    Write-Host "  Deleted: script.js" -ForegroundColor Green
}

# Step 4: Show what will be pushed
Write-Host ""
Write-Host "Step 4: Files ready to push:" -ForegroundColor Yellow
Write-Host "  - index.html" -ForegroundColor Green
Write-Host "  - app.js" -ForegroundColor Green
Write-Host "  - styles.css" -ForegroundColor Green
Write-Host "  - config.js" -ForegroundColor Green
Write-Host "  - images/" -ForegroundColor Green
Write-Host "  - README.md" -ForegroundColor Green
Write-Host "  - Documentation files" -ForegroundColor Green
Write-Host "  - Configuration files" -ForegroundColor Green

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Files prepared! Ready to push." -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next: Run these Git commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  git add ." -ForegroundColor Cyan
Write-Host "  git commit -m 'Major update: Professional weather app'" -ForegroundColor Cyan
Write-Host "  git push origin main" -ForegroundColor Cyan
Write-Host ""
