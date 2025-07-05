# Fix file paths in HTML files
$htmlFiles = @(
    "contact.html", 
    "courses.html", 
    "testimonial.html", 
    "404.html"
)

foreach ($file in $htmlFiles) {
    $filePath = "c:\Users\sumit\OneDrive\Desktop\Prepixo\prepixo\$file"
    if (Test-Path $filePath) {
        Write-Host "Updating $file..."
        $content = Get-Content $filePath -Raw
        
        # Update CSS paths
        $content = $content -replace 'href="css/', 'href="assets/css/'
        $content = $content -replace 'href="lib/', 'href="assets/vendor/'
        $content = $content -replace 'href="img/', 'href="assets/images/'
        
        # Update JS paths
        $content = $content -replace 'src="lib/', 'src="assets/vendor/'
        $content = $content -replace 'src="js/', 'src="assets/js/'
        
        # Update image paths
        $content = $content -replace 'src="img/', 'src="assets/images/'
        
        # Update Font Awesome version
        $content = $content -replace 'font-awesome/5.10.0', 'font-awesome/6.0.0'
        $content = $content -replace 'bootstrap-icons@1.4.1', 'bootstrap-icons@1.10.0'
        
        # Write back to file
        Set-Content $filePath $content -Encoding UTF8
        Write-Host "Updated $file successfully!"
    }
}
