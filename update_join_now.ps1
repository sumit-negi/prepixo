# PowerShell script to update all Join Now buttons across multiple HTML files

$files = @(
    "course-ai-deep-learning.html",
    "course-data-science.html", 
    "course-details.html",
    "course-java-development.html",
    "course-machine-learning.html",
    "course-python-programming.html",
    "course-web-development.html",
    "course-web-development-new.html"
)

# Modal HTML content
$modalHTML = @"

    <!-- Join Now Modal -->
    <div class="modal fade" id="joinNowModal" tabindex="-1" aria-labelledby="joinNowModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" style="max-width: 95vw; margin: 0.5rem auto;">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="joinNowModalLabel">
                        <i class="fa fa-graduation-cap me-2"></i>Join Prepixo - Start Your Learning Journey
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-2 p-md-3">
                    <!-- Zoho Form Iframe -->
                    <iframe aria-label='Prepixo - Join now' frameborder="0" style="height:500px;width:99%;border:none;" src='https://forms.zohopublic.in/sumitnegi940gm1/form/PrepixoJoinnow/formperma/-snb9afnPDOweHkpktNFIVkpURKppsBnfS1QzyqVAj8'></iframe>
                </div>
                <div class="modal-footer bg-light">
                    <div class="d-flex align-items-center justify-content-between w-100">
                        <div class="text-muted small">
                            <i class="fa fa-shield-alt text-success me-1"></i>
                            Your information is secure and protected
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Track modal open event for analytics
        document.getElementById('joinNowModal').addEventListener('shown.bs.modal', function () {
            // Facebook Pixel tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Join Now Modal Opened',
                    content_category: 'Enrollment'
                });
            }
        });
    </script>

</body>
"@

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating $file..."
        
        # Read the file content
        $content = Get-Content $file -Raw
        
        # Update Join Now button in navbar to use modal
        $content = $content -replace 'href="" class="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Join Now', 'href="#" class="btn btn-primary py-4 px-lg-5 d-none d-lg-block" data-bs-toggle="modal" data-bs-target="#joinNowModal">Join Now'
        $content = $content -replace 'href="contact.html" class="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Join Now', 'href="#" class="btn btn-primary py-4 px-lg-5 d-none d-lg-block" data-bs-toggle="modal" data-bs-target="#joinNowModal">Join Now'
        
        # Add modal before closing body tag
        $content = $content -replace '</body>', $modalHTML
        
        # Write the updated content back
        Set-Content $file $content -Encoding UTF8
        
        Write-Host "Updated $file successfully!"
    } else {
        Write-Host "File $file not found!"
    }
}

Write-Host "All files updated successfully!"
