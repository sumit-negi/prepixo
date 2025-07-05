# Fix image paths in HTML files  
$htmlFiles = @(
    "contact.html", 
    "courses.html", 
    "testimonial.html", 
    "404.html",
    "team.html",
    "index.html"
)

foreach ($file in $htmlFiles) {
    $filePath = "c:\Users\sumit\OneDrive\Desktop\Prepixo\prepixo\$file"
    if (Test-Path $filePath) {
        Write-Host "Updating image paths in $file..."
        $content = Get-Content $filePath -Raw
        
        # Update image paths
        $content = $content -replace 'src="img/', 'src="assets/images/'
        
        # Fix team images from .jpg to .png
        $content = $content -replace 'src="assets/images/team-1.jpg"', 'src="assets/images/team-1.png"'
        $content = $content -replace 'src="assets/images/team-2.jpg"', 'src="assets/images/team-2.png"'
        $content = $content -replace 'src="assets/images/team-3.jpg"', 'src="assets/images/team-3.png"'
        $content = $content -replace 'src="assets/images/team-4.jpg"', 'src="assets/images/team-4.png"'
        
        # Write back to file
        Set-Content $filePath $content -Encoding UTF8
        Write-Host "Updated $file successfully!"
    }
}
