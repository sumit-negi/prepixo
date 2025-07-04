# PowerShell script to update asset paths in HTML files
$projectRoot = "c:\Users\sumit\OneDrive\Desktop\Prepixo\prepixo"

# Define path mappings
$pathMappings = @{
    'img/' = 'assets/images/'
    'css/' = 'assets/css/'
    'js/' = 'assets/js/'
    'lib/' = 'assets/vendor/'
}

# Get all HTML files (exclude backup and test files)
$htmlFiles = Get-ChildItem -Path $projectRoot -Name "*.html" | Where-Object { 
    $_ -notlike "*backup*" -and 
    $_ -notlike "*new*" -and 
    $_ -notlike "*static*" -and 
    $_ -notlike "*original*" 
}

Write-Host "Updating asset paths in HTML files..." -ForegroundColor Green

foreach ($file in $htmlFiles) {
    $filePath = Join-Path $projectRoot $file
    $content = Get-Content $filePath -Raw
    $originalContent = $content
    
    foreach ($oldPath in $pathMappings.Keys) {
        $newPath = $pathMappings[$oldPath]
        $content = $content -replace [regex]::Escape($oldPath), $newPath
    }
    
    if ($content -ne $originalContent) {
        Set-Content $filePath $content -NoNewline
        Write-Host "Updated: $file" -ForegroundColor Yellow
    } else {
        Write-Host "No changes needed: $file" -ForegroundColor Gray
    }
}

# Update component files
$componentPath = Join-Path $projectRoot "components"
$componentFiles = Get-ChildItem -Path $componentPath -Name "*.html"

Write-Host "`nUpdating asset paths in component files..." -ForegroundColor Green

foreach ($file in $componentFiles) {
    $filePath = Join-Path $componentPath $file
    $content = Get-Content $filePath -Raw
    $originalContent = $content
    
    foreach ($oldPath in $pathMappings.Keys) {
        $newPath = $pathMappings[$oldPath]
        $content = $content -replace [regex]::Escape($oldPath), $newPath
    }
    
    if ($content -ne $originalContent) {
        Set-Content $filePath $content -NoNewline
        Write-Host "Updated: components/$file" -ForegroundColor Yellow
    } else {
        Write-Host "No changes needed: components/$file" -ForegroundColor Gray
    }
}

Write-Host "`nAsset path updates completed!" -ForegroundColor Green
