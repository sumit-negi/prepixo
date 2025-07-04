/**
 * Alternative Component Loader - Works without server (for file:// protocol)
 * Uses document.write() for initial page load or dynamic script injection
 */

// Component definitions - inline to avoid CORS issues
const COMPONENTS = {
    head: `<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<meta content="" name="keywords">
<meta content="" name="description">

<!-- Favicon -->
<link href="img/favicon.ico" rel="icon">

<!-- Google Web Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet">

<!-- Icon Font Stylesheet -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

<!-- Libraries Stylesheet -->
<link href="lib/animate/animate.min.css" rel="stylesheet">
<link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

<!-- Customized Bootstrap Stylesheet -->
<link href="css/bootstrap.min.css" rel="stylesheet">

<!-- Template Stylesheet -->
<link href="css/style.css" rel="stylesheet">`,

    spinner: `<!-- Spinner Start -->
<div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>
<!-- Spinner End -->`,

    navbar: `<!-- Navbar Start -->
<nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
    <a href="index.html" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
        <h2 class="m-0 text-primary"><i class="fa fa-book me-3"></i>Prepixo <span style='font-size:16px;font-weight:400;'>– Prep Hard. Earn Big</span></h2>
    </a>
    <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto p-4 p-lg-0">
            <a href="index.html" class="nav-item nav-link">Home</a>
            <a href="about.html" class="nav-item nav-link">About</a>
            <a href="courses.html" class="nav-item nav-link">Courses</a>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                <div class="dropdown-menu fade-down m-0">
                    <a href="team.html" class="dropdown-item">Our Team</a>
                    <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                </div>
            </div>
            <a href="contact.html" class="nav-item nav-link">Contact</a>
        </div>
        <a href="" class="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Join Now<i class="fa fa-arrow-right ms-3"></i></a>
    </div>
</nav>
<!-- Navbar End -->`,

    footer: `<!-- Footer Start -->
<div class="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
    <div class="container py-5">
        <div class="row g-5">
            <div class="col-lg-3 col-md-6">
                <h4 class="text-white mb-3">Quick Link</h4>
                <a class="btn btn-link" href="">About Us</a>
                <a class="btn btn-link" href="">Contact Us</a>
                <a class="btn btn-link" href="">Privacy Policy</a>
                <a class="btn btn-link" href="">Terms & Condition</a>
                <a class="btn btn-link" href="">FAQs & Help</a>
            </div>
            <div class="col-lg-3 col-md-6">
                <h4 class="text-white mb-3">Contact</h4>
                <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Whitefield, Bangalore, IND</p>
                <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+91-8826327302</p>
                <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@prepixo.com</p>
                <div class="d-flex pt-2">
                    <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-youtube"></i></a>
                    <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="copyright">
            <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a class="border-bottom" href="#">Prepixo</a>, All Right Reserved.
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <div class="footer-menu">
                        <a href="">Home</a>
                        <a href="">Cookies</a>
                        <a href="">Help</a>
                        <a href="">FQAs</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Footer End -->`,

    scripts: `<!-- JavaScript Libraries -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="lib/wow/wow.min.js"></script>
<script src="lib/easing/easing.min.js"></script>
<script src="lib/waypoints/waypoints.min.js"></script>
<script src="lib/owlcarousel/owl.carousel.min.js"></script>

<!-- Template Javascript -->
<script src="js/main.js"></script>`,

    tawk: `<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6866c10ee99c7a19113bb97a/1iv8m48mh';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->`
};

class StaticComponentLoader {
    constructor() {
        this.components = COMPONENTS;
    }

    /**
     * Load a component into target element
     */
    loadComponent(componentName, targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement && this.components[componentName]) {
            targetElement.innerHTML = this.components[componentName];
        } else {
            console.error(`Component ${componentName} or target ${targetSelector} not found`);
        }
    }

    /**
     * Load page header with custom title and breadcrumb
     */
    loadPageHeader(title, currentPage, breadcrumbs = null) {
        let html = `<!-- Header Start -->
<div class="container-fluid bg-primary py-5 mb-5 page-header">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-10 text-center">
                <h1 class="display-3 text-white animated slideInDown">${title}</h1>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb justify-content-center">`;

        if (breadcrumbs) {
            breadcrumbs.forEach(crumb => {
                if (crumb.active) {
                    html += `<li class="breadcrumb-item text-white active" aria-current="page">${crumb.name}</li>`;
                } else {
                    html += `<li class="breadcrumb-item"><a class="text-white" href="${crumb.url}">${crumb.name}</a></li>`;
                }
            });
        } else {
            html += `<li class="breadcrumb-item"><a class="text-white" href="index.html">Home</a></li>
                     <li class="breadcrumb-item text-white active" aria-current="page">${currentPage}</li>`;
        }

        html += `                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>
<!-- Header End -->`;

        const targetElement = document.querySelector('#page-header-container');
        if (targetElement) {
            targetElement.innerHTML = html;
        }
    }

    /**
     * Initialize common components
     */
    initCommonComponents() {
        this.loadComponent('head', '#head-container');
        this.loadComponent('spinner', '#spinner-container');
        this.loadComponent('navbar', '#navbar-container');
        this.loadComponent('footer', '#footer-container');
        this.loadComponent('scripts', '#scripts-container');
        this.loadComponent('tawk', '#tawk-container');
    }

    /**
     * Set active navigation link
     */
    setActiveNavLink() {
        setTimeout(() => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }, 100);
    }
}

// Global instance
window.staticComponentLoader = new StaticComponentLoader();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.staticComponentLoader.initCommonComponents();
    window.staticComponentLoader.setActiveNavLink();
});

// For backward compatibility
window.componentLoader = window.staticComponentLoader;
