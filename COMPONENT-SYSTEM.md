# Prepixo Website - Component System

This website has been refactored to use a modular component system that eliminates code duplication and makes maintenance easier.

## 📁 Component Structure

### `/components/` Directory
Contains all reusable HTML components:

- **`head.html`** - Common head section with meta tags, CSS links
- **`spinner.html`** - Loading spinner component
- **`navbar.html`** - Navigation bar
- **`page-header.html`** - Page header with breadcrumbs (templatable)
- **`footer.html`** - Site footer
- **`team.html`** - Team/instructors section
- **`about-content.html`** - About page specific content
- **`scripts.html`** - Common JavaScript libraries
- **`tawk.html`** - Tawk.to chat widget

### Component Loader (`js/components.js`)
JavaScript utility that:
- ✅ Loads HTML components asynchronously
- ✅ Manages component caching for better performance
- ✅ Handles template replacement ({{VARIABLE}} syntax)
- ✅ Sets active navigation states automatically
- ✅ Provides easy methods for component management

## 🚀 Benefits

1. **84% Code Reduction** - Pages now ~42 lines vs 280+ lines
2. **Zero Code Duplication** - Common elements defined once
3. **Easy Maintenance** - Update navbar/footer in one place
4. **Faster Development** - New pages created in minutes
5. **Better Performance** - Components cached after first load
6. **Dynamic Features** - Automatic active nav highlighting

## 📋 Usage

### Basic Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Page Title - Prepixo</title>
    <div id="head-container"></div>
</head>
<body>
    <div id="spinner-container"></div>
    <div id="navbar-container"></div>
    <div id="page-header-container"></div>
    
    <!-- Your page content here -->
    <div id="content-container"></div>
    
    <div id="footer-container"></div>
    <div id="scripts-container"></div>
    
    <script src="js/components.js"></script>
    
    <!-- Page-specific initialization -->
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            // Load page header with custom title and breadcrumbs
            await window.componentLoader.loadPageHeader('Page Title', 'Current Page', [
                { name: 'Home', url: 'index.html', active: false },
                { name: 'Current Page', url: '#', active: true }
            ]);
            
            // Load other components as needed
            await window.componentLoader.loadComponent('component-name', '#target-container');
        });
    </script>
    
    <div id="tawk-container"></div>
</body>
</html>
```

### Loading Components
```javascript
// Load a single component
await window.componentLoader.loadComponent('component-name', '#target-selector');

// Load multiple components
await window.componentLoader.loadComponents([
    { name: 'team', target: '#team-container' },
    { name: 'about-content', target: '#content-container' }
]);

// Load page header with custom breadcrumbs
await window.componentLoader.loadPageHeader('About Us', 'About', [
    { name: 'Home', url: 'index.html', active: false },
    { name: 'Pages', url: '#', active: false },
    { name: 'About', url: '#', active: true }
]);
```

## 🔄 Before vs After Comparison

### **Before (Original team.html)**: 281 lines
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 25+ lines of repeated head content -->
    <meta charset="utf-8">
    <title>Prepixo</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <!-- ... more repeated head content ... -->
</head>
<body>
    <!-- 10+ lines of repeated spinner -->
    <!-- 25+ lines of repeated navbar -->
    <!-- 15+ lines of repeated header -->
    <!-- 80+ lines of team content -->
    <!-- 80+ lines of repeated footer -->
    <!-- 15+ lines of repeated scripts -->
    <!-- 10+ lines of repeated Tawk.to -->
</body>
</html>
```

### **After (New team.html)**: 42 lines
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Our Team - Prepixo</title>
    <div id="head-container"></div>
</head>
<body>
    <div id="spinner-container"></div>
    <div id="navbar-container"></div>
    <div id="page-header-container"></div>
    <div id="team-container"></div>
    <div id="footer-container"></div>
    <div id="scripts-container"></div>
    
    <script src="js/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            await window.componentLoader.loadPageHeader('Our Team', 'Team', [
                { name: 'Home', url: 'index.html', active: false },
                { name: 'Pages', url: '#', active: false },
                { name: 'Team', url: '#', active: true }
            ]);
            await window.componentLoader.loadComponent('team', '#team-container');
        });
    </script>
    
    <div id="tawk-container"></div>
</body>
</html>
```

## 📦 Files Created

```
components/
├── head.html              # Common head content
├── navbar.html            # Navigation bar
├── page-header.html       # Dynamic page header
├── footer.html            # Site footer
├── team.html              # Team section
├── about-content.html     # About page content
├── spinner.html           # Loading spinner
├── scripts.html           # JavaScript libraries
└── tawk.html              # Chat widget

js/
└── components.js          # Component loader utility

# Example new pages
team-new.html              # New team page (42 lines vs 281)
about-new.html             # New about page
```

## 🛠️ Creating New Components

1. Create a new `.html` file in `/components/` directory
2. Include only the HTML content (no DOCTYPE, html, head, or body tags)
3. Use placeholder syntax `{{VARIABLE_NAME}}` for dynamic content
4. Load the component using `componentLoader.loadComponent()`

## 🔧 Migration Steps for Remaining Pages

To convert other pages to use the component system:

1. **Extract main content** from existing page (between header and footer)
2. **Create component file** if content is reusable
3. **Replace page** with component structure
4. **Add initialization script** to load components

Example pages to convert:
- `index.html` → Component-based homepage
- `courses.html` → Component-based courses page
- `contact.html` → Component-based contact page
- `testimonial.html` → Component-based testimonials page

## ✅ Current Status

- ✅ Component system created and tested
- ✅ Team page converted (`team-new.html`)
- ✅ About page converted (`about-new.html`)
- ✅ All common components extracted
- ✅ Component loader with caching and templating
- ✅ Active navigation highlighting
- ⏳ Remaining pages to convert

The component system is now live and ready to dramatically reduce code duplication across your website!
