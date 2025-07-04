# Icon Loading Diagnostic Script
Write-Host "🔍 Checking Icon Loading Issues..." -ForegroundColor Cyan

# Check if icon CDNs are accessible
$iconCDNs = @(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
)

Write-Host "`n📡 Testing CDN Accessibility:" -ForegroundColor Yellow
foreach ($cdn in $iconCDNs) {
    try {
        $response = Invoke-WebRequest -Uri $cdn -UseBasicParsing -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $cdn - OK" -ForegroundColor Green
        } else {
            Write-Host "❌ $cdn - Status: $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ $cdn - Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Check local asset structure
Write-Host "`n📁 Checking Local Asset Structure:" -ForegroundColor Yellow
$requiredPaths = @(
    "assets/css/bootstrap.min.css",
    "assets/css/style.css", 
    "assets/js/main.js",
    "assets/js/components.js",
    "components/head.html"
)

foreach ($path in $requiredPaths) {
    if (Test-Path $path) {
        Write-Host "✅ $path exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $path missing" -ForegroundColor Red
    }
}

# Check component head content
Write-Host "`n🧩 Checking Component Head Content:" -ForegroundColor Yellow
if (Test-Path "components/head.html") {
    $headContent = Get-Content "components/head.html" -Raw
    if ($headContent -match "font-awesome") {
        Write-Host "✅ Font Awesome reference found" -ForegroundColor Green
    } else {
        Write-Host "❌ Font Awesome reference missing" -ForegroundColor Red
    }
    
    if ($headContent -match "bootstrap-icons") {
        Write-Host "✅ Bootstrap Icons reference found" -ForegroundColor Green
    } else {
        Write-Host "❌ Bootstrap Icons reference missing" -ForegroundColor Red
    }
}

Write-Host "`n🔧 Common Solutions:" -ForegroundColor Cyan
Write-Host "1. Clear browser cache (Ctrl+F5)" -ForegroundColor White
Write-Host "2. Check network/firewall blocking CDNs" -ForegroundColor White
Write-Host "3. Open dev console (F12) to check for errors" -ForegroundColor White
Write-Host "4. Ensure you're viewing the updated files with component system" -ForegroundColor White

Write-Host "`n✨ Diagnostic Complete!" -ForegroundColor Green
