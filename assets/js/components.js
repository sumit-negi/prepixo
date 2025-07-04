/**
 * Component Loader - Load reusable HTML components
 */
class ComponentLoader {
    constructor() {
        this.components = {};
        this.loadedComponents = new Set();
    }

    /**
     * Load a component from the components directory
     * @param {string} componentName - Name of the component file (without .html)
     * @param {string} targetSelector - CSS selector where to insert the component
     * @param {Function} callback - Optional callback function after loading
     */
    async loadComponent(componentName, targetSelector, callback) {
        try {
            // Check if component is already loaded
            if (this.components[componentName]) {
                this.insertComponent(this.components[componentName], targetSelector, callback);
                return;
            }

            // Fetch the component
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Component ${componentName} not found`);
            }

            const html = await response.text();
            this.components[componentName] = html;
            this.insertComponent(html, targetSelector, callback);
            this.loadedComponents.add(componentName);
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
        }
    }

    /**
     * Insert component HTML into target element
     */
    insertComponent(html, targetSelector, callback) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.innerHTML = html;
            if (callback && typeof callback === 'function') {
                callback();
            }
        } else {
            console.error(`Target element ${targetSelector} not found`);
        }
    }

    /**
     * Load multiple components at once
     * @param {Array} components - Array of {name, target, callback} objects
     */
    async loadComponents(components) {
        const promises = components.map(component => 
            this.loadComponent(component.name, component.target, component.callback)
        );
        await Promise.all(promises);
    }

    /**
     * Initialize common components for all pages
     */
    async initCommonComponents() {
        const commonComponents = [
            { name: 'head', target: '#head-container' },
            { name: 'spinner', target: '#spinner-container' },
            { name: 'navbar', target: '#navbar-container' },
            { name: 'footer', target: '#footer-container' },
            { name: 'scripts', target: '#scripts-container' },
            { name: 'tawk', target: '#tawk-container' }
        ];

        await this.loadComponents(commonComponents);
    }

    /**
     * Load page header with custom title and breadcrumb
     * @param {string} title - Page title
     * @param {string} currentPage - Current page name for breadcrumb
     * @param {Array} breadcrumbs - Optional custom breadcrumb items
     */
    async loadPageHeader(title, currentPage, breadcrumbs = null) {
        try {
            let html = this.components['page-header'];
            if (!html) {
                const response = await fetch('components/page-header.html');
                html = await response.text();
                this.components['page-header'] = html;
            }

            // Replace placeholders
            html = html.replace('{{PAGE_TITLE}}', title);
            html = html.replace('{{CURRENT_PAGE}}', currentPage);

            // Handle custom breadcrumbs if provided
            if (breadcrumbs) {
                let breadcrumbHtml = breadcrumbs.map(crumb => {
                    if (crumb.active) {
                        return `<li class="breadcrumb-item text-white active" aria-current="page">${crumb.name}</li>`;
                    } else {
                        return `<li class="breadcrumb-item"><a class="text-white" href="${crumb.url}">${crumb.name}</a></li>`;
                    }
                }).join('');
                
                html = html.replace(
                    /<ol class="breadcrumb justify-content-center" id="breadcrumb-container">[\s\S]*?<\/ol>/,
                    `<ol class="breadcrumb justify-content-center" id="breadcrumb-container">${breadcrumbHtml}</ol>`
                );
            }

            this.insertComponent(html, '#page-header-container');
        } catch (error) {
            console.error('Error loading page header:', error);
        }
    }

    /**
     * Set active navigation link based on current page
     */
    setActiveNavLink() {
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
    }
}

// Global instance
window.componentLoader = new ComponentLoader();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    await window.componentLoader.initCommonComponents();
    
    // Set active nav link after navbar is loaded
    setTimeout(() => {
        window.componentLoader.setActiveNavLink();
    }, 100);
});
