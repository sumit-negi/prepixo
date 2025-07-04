# Prepixo - E-Learning Platform

> **Prep Hard. Earn Big** - Your gateway to mastering in-demand skills for the digital age.

## 🎯 **About**

Prepixo offers live, instructor-led classes and downloadable course outlines in:
- **Data Engineering** 
- **Data Analytics**
- **Power BI**
- **SQL** 
- **Python**
- **Microsoft Excel**

## 🚀 **Features**

- ✅ **Expert Instructors** - Learn from industry professionals
- ✅ **Live & Online Classes** - Interactive sessions with flexible learning
- ✅ **Job Interview Prep** - Mock interviews and practical projects
- ✅ **Downloadable Outlines** - Access detailed course materials
- ✅ **Modern Component System** - Modular, maintainable codebase

## 📁 **Project Structure**

```
prepixo/
├── 📄 Main Pages
│   ├── index.html              # Homepage
│   ├── about.html              # About page
│   ├── team.html               # Team page
│   ├── courses.html            # Courses page
│   ├── contact.html            # Contact page
│   ├── testimonial.html        # Testimonials page
│   └── 404.html                # Error page
│
├── 🧩 Components (Reusable)
│   ├── components/
│   │   ├── head.html           # Common head section
│   │   ├── navbar.html         # Navigation bar
│   │   ├── footer.html         # Site footer
│   │   ├── page-header.html    # Dynamic page headers
│   │   └── team.html           # Team section
│
├── 💾 Assets (Organized)
│   ├── assets/
│   │   ├── css/                # Stylesheets
│   │   ├── js/                 # JavaScript files
│   │   ├── images/             # All images
│   │   ├── vendor/             # Third-party libraries
│   │   └── course-materials/   # PDF course outlines
│
├── 📚 Documentation
│   ├── docs/
│   │   ├── COMPONENT-SYSTEM.md
│   │   ├── DEBUGGING-GUIDE.md
│   │   └── CLEANUP-SUMMARY.md
│
├── 🛠️ Development
│   └── dev/
│       ├── scss/               # SASS source files
│       └── page-migration-utility.js
│
└── ⚙️ Configuration
    ├── .vscode/                # VS Code settings
    └── .github/                # GitHub workflows
```

## 🛠️ **Development Setup**

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- VS Code (recommended) with Live Server extension
- Git for version control

### **Quick Start**
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prepixo
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Launch the website**
   - Press `F5` in VS Code
   - Select "Launch Chrome - Static Files"
   - Or right-click `index.html` → "Open with Live Server"

## 🔧 **Component System**

This project uses a modern component-based architecture:

### **Benefits:**
- 🚫 **Zero Code Duplication** - Common elements defined once
- ⚡ **Fast Development** - New pages created in minutes  
- 🔧 **Easy Maintenance** - Update header/footer in one place
- 📱 **Consistent UI** - Standardized components across pages

### **Usage:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Page Title - Prepixo</title>
    <div id="head-container"></div>
</head>
<body>
    <div id="navbar-container"></div>
    <div id="page-header-container"></div>
    
    <!-- Your content here -->
    
    <div id="footer-container"></div>
    <script src="assets/js/components.js"></script>
</body>
</html>
```

## 📞 **Contact Information**

- **📍 Location:** Whitefield, Bangalore, IND
- **📱 Phone:** +91-8826327302  
- **📧 Email:** info@prepixo.com
- **💬 Live Chat:** Available on website

## 📄 **License**

This project is licensed under the terms specified in the LICENSE files.

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ for learners worldwide** | © 2025 Prepixo. All rights reserved.
