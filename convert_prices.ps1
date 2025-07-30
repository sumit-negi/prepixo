# PowerShell script to convert rupees to dollars in all course files
# This script will find all rupee symbols and convert them to $ with prices divided by 10

$courseFiles = Get-ChildItem -Path "." -Name "course-*.html"

foreach ($file in $courseFiles) {
    Write-Host "Processing $file..."
    
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # Convert all rupee amounts to dollars (divide by 10)
    # Using Unicode for rupee symbol
    $content = $content -replace '₹([0-9,]+)', {
        param($match)
        $amount = $match.Groups[1].Value -replace ',', ''
        $dollarAmount = [math]::Floor([int]$amount / 10)
        # Add commas back for thousands
        $formattedAmount = "{0:N0}" -f $dollarAmount
        return "`$$formattedAmount"
    }
    
    # Write back to file
    Set-Content -Path $file -Value $content -NoNewline -Encoding UTF8
    
    Write-Host "Completed $file"
}

Write-Host "Price conversion completed for all course files!"
