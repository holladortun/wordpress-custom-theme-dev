
---

# Custom WordPress Theme Boilerplate

This is a boilerplate for creating custom WordPress themes using Gulp as a task runner for SCSS compilation, JavaScript transpilation, image optimization, and live reloading. It provides a starting point for building WordPress themes with modern development practices.

## Features

- SCSS compilation with autoprefixer and minification.
- JavaScript transpilation using Babel and concatenation with UglifyJS.
- Image optimization and conversion to WebP format.
- BrowserSync for live reloading and synchronized browsing.
- Source maps for easier debugging.

## Folder Structure

The folder structure follows a standard WordPress theme structure, with additional folders for source code and build output:

```
.
├── dist/                 # Distribution folder for compiled and optimized files
│   ├── css/              # Compiled and minified CSS files
│   ├── js/               # Transpiled and minified JavaScript files
│   └── images/           # Optimized images
├── src/                  # Source code folder
│   ├── js/               # JavaScript source files
│   ├── scss/             # SCSS source files
│   └── images/           # Original images
├── node_modules/         # Node.js modules (automatically generated)
├── template-parts/       # folder for php template files
├── gulpfile.babel.js     # Gulp tasks and configuration
├── functions.php         # functions php file for wordpress
├── index.php             # mandatory index php file for WordPress
├── style.css             # mandatory style.css file for WordPress
├── package.json          # Project configuration and dependencies
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone this repository or download the ZIP archive.

2. In the project root directory, open a terminal and run the following command to install the required dependencies:

   ```
   npm install
   ```

### Development Workflow

1. Run the following command to start the development server with live reloading:

   ```
   npm start
   ```

   This will run gulp tasks like compile the SCSS files, transpile the JavaScript files, optimize the images, and start a local server with BrowserSync. Any changes made to the source files will trigger the corresponding tasks and automatically refresh the browser.

2.  All files should be added in the src folder as gulp will output assets, js, compiled sass into the dist. folder.



### Customization

- Update the Gulp tasks and configurations in the `gulpfile.babel.js` file to suit your specific needs.
- Extend or modify the build process by adding additional Gulp tasks or plugins.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README further based on your specific requirements, providing more details about your theme's features, usage instructions, and any additional guidelines or considerations.