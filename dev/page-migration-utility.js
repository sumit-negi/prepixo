/**
 * Page Migration Utility
 * Helps convert existing pages to use the component system
 */

// Page conversion templates
const pageTemplates = {
    basic: `<!DOCTYPE html>
<html lang="en">

<head>
    <title>{{PAGE_TITLE}} - Prepixo</title>
    <!-- Common Head Content -->
    <div id="head-container"></div>
</head>

<body>
    <!-- Spinner Container -->
    <div id="spinner-container"></div>

    <!-- Navbar Container -->
    <div id="navbar-container"></div>

    <!-- Page Header Container -->
    <div id="page-header-container"></div>

    <!-- Main Content Container -->
    <div id="main-content-container">
        {{MAIN_CONTENT}}
    </div>

    <!-- Footer Container -->
    <div id="footer-container"></div>

    <!-- Scripts Container -->
    <div id="scripts-container"></div>

    <!-- Component Loader -->
    <script src="js/components.js"></script>

    <!-- Page-specific initialization -->
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            // Load page header
            await window.componentLoader.loadPageHeader('{{PAGE_TITLE}}', '{{BREADCRUMB_CURRENT}}', {{BREADCRUMBS}});
            
            {{COMPONENT_LOADS}}
        });
    </script>

    <!-- Tawk Container -->
    <div id="tawk-container"></div>

</body>

</html>`,

    withComponents: `<!DOCTYPE html>
<html lang="en">

<head>
    <title>{{PAGE_TITLE}} - Prepixo</title>
    <!-- Common Head Content -->
    <div id="head-container"></div>
</head>

<body>
    <!-- Spinner Container -->
    <div id="spinner-container"></div>

    <!-- Navbar Container -->
    <div id="navbar-container"></div>

    <!-- Page Header Container -->
    <div id="page-header-container"></div>

    {{CONTENT_CONTAINERS}}

    <!-- Footer Container -->
    <div id="footer-container"></div>

    <!-- Scripts Container -->
    <div id="scripts-container"></div>

    <!-- Component Loader -->
    <script src="js/components.js"></script>

    <!-- Page-specific initialization -->
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            // Load page header
            await window.componentLoader.loadPageHeader('{{PAGE_TITLE}}', '{{BREADCRUMB_CURRENT}}', {{BREADCRUMBS}});
            
            {{COMPONENT_LOADS}}
        });
    </script>

    <!-- Tawk Container -->
    <div id="tawk-container"></div>

</body>

</html>`
};

// Page configurations for common pages
const pageConfigs = {
    'index.html': {
        title: 'Home',
        breadcrumbCurrent: 'Home',
        breadcrumbs: '[{ name: "Home", url: "#", active: true }]',
        containers: ['<!-- Hero Section Container -->', '<div id="hero-container"></div>', '<!-- Features Container -->', '<div id="features-container"></div>', '<!-- Courses Container -->', '<div id="courses-container"></div>', '<!-- Team Container -->', '<div id="team-container"></div>'],
        components: [
            'await window.componentLoader.loadComponent("hero", "#hero-container");',
            'await window.componentLoader.loadComponent("features", "#features-container");',
            'await window.componentLoader.loadComponent("courses-preview", "#courses-container");',
            'await window.componentLoader.loadComponent("team", "#team-container");'
        ]
    },
    'about.html': {
        title: 'About Us',
        breadcrumbCurrent: 'About',
        breadcrumbs: '[{ name: "Home", url: "index.html", active: false }, { name: "Pages", url: "#", active: false }, { name: "About", url: "#", active: true }]',
        containers: ['<!-- About Content Container -->', '<div id="about-content-container"></div>', '<!-- Team Container -->', '<div id="team-container"></div>'],
        components: [
            'await window.componentLoader.loadComponent("about-content", "#about-content-container");',
            'await window.componentLoader.loadComponent("team", "#team-container");'
        ]
    },
    'team.html': {
        title: 'Our Team',
        breadcrumbCurrent: 'Team',
        breadcrumbs: '[{ name: "Home", url: "index.html", active: false }, { name: "Pages", url: "#", active: false }, { name: "Team", url: "#", active: true }]',
        containers: ['<!-- Team Container -->', '<div id="team-container"></div>'],
        components: [
            'await window.componentLoader.loadComponent("team", "#team-container");'
        ]
    },
    'courses.html': {
        title: 'Courses',
        breadcrumbCurrent: 'Courses',
        breadcrumbs: '[{ name: "Home", url: "index.html", active: false }, { name: "Courses", url: "#", active: true }]',
        containers: ['<!-- Courses Container -->', '<div id="courses-container"></div>'],
        components: [
            'await window.componentLoader.loadComponent("courses-content", "#courses-container");'
        ]
    },
    'contact.html': {
        title: 'Contact Us',
        breadcrumbCurrent: 'Contact',
        breadcrumbs: '[{ name: "Home", url: "index.html", active: false }, { name: "Contact", url: "#", active: true }]',
        containers: ['<!-- Contact Container -->', '<div id="contact-container"></div>'],
        components: [
            'await window.componentLoader.loadComponent("contact-content", "#contact-container");'
        ]
    },
    'testimonial.html': {
        title: 'Testimonials',
        breadcrumbCurrent: 'Testimonial',
        breadcrumbs: '[{ name: "Home", url: "index.html", active: false }, { name: "Pages", url: "#", active: false }, { name: "Testimonial", url: "#", active: true }]',
        containers: ['<!-- Testimonial Container -->', '<div id="testimonial-container"></div>'],
        components: [
            'await window.componentLoader.loadComponent("testimonial-content", "#testimonial-container");'
        ]
    }
};

/**
 * Generate a new page using the component system
 * @param {string} pageName - Name of the page (e.g., 'about.html')
 * @param {string} template - Template type ('basic' or 'withComponents')
 * @returns {string} Generated HTML
 */
function generateComponentPage(pageName, template = 'withComponents') {
    const config = pageConfigs[pageName];
    if (!config) {
        console.error(`No configuration found for ${pageName}`);
        return null;
    }

    let html = pageTemplates[template];
    
    // Replace placeholders
    html = html.replace(/{{PAGE_TITLE}}/g, config.title);
    html = html.replace(/{{BREADCRUMB_CURRENT}}/g, config.breadcrumbCurrent);
    html = html.replace(/{{BREADCRUMBS}}/g, config.breadcrumbs);
    
    if (template === 'withComponents') {
        html = html.replace(/{{CONTENT_CONTAINERS}}/g, config.containers.join('\n    '));
    }
    
    html = html.replace(/{{COMPONENT_LOADS}}/g, config.components.join('\n            '));

    return html;
}

/**
 * Generate conversion instructions for a page
 * @param {string} pageName - Name of the page
 * @returns {object} Conversion instructions
 */
function getConversionInstructions(pageName) {
    const config = pageConfigs[pageName];
    if (!config) {
        return { error: `No configuration found for ${pageName}` };
    }

    return {
        pageName,
        steps: [
            '1. Create backup of original file',
            '2. Extract main content sections to separate component files',
            '3. Replace original file with component-based structure',
            '4. Test the new page to ensure all components load correctly'
        ],
        componentsNeeded: config.components.map(comp => {
            const match = comp.match(/loadComponent\("([^"]+)"/);
            return match ? match[1] : '';
        }).filter(Boolean),
        template: generateComponentPage(pageName)
    };
}

// Console helper functions
console.log('Page Migration Utility loaded!');
console.log('Available functions:');
console.log('- generateComponentPage(pageName, template)');
console.log('- getConversionInstructions(pageName)');
console.log('');
console.log('Available pages:', Object.keys(pageConfigs));

// Make functions available globally for testing
if (typeof window !== 'undefined') {
    window.pageMigration = {
        generateComponentPage,
        getConversionInstructions,
        pageConfigs,
        pageTemplates
    };
}
