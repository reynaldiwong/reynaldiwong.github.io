# Rey's DevOps Portfolio

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.
Designed to showcase DevOps skills, projects, and professional background.

## Features

- **Modern Stack**: Built with Vite, React 19, and TypeScript.
- **Styling**: Tailwind CSS for rapid and responsive design.
- **CI/CD**: GitHub Actions workflow included to automatically deploy to GitHub Pages.
- **Sections**:
  - Hero (Introduction)
  - About Me
  - Technical Skills
  - Projects Showcase
  - Contact

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/rey-website.git
    cd rey-website
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Build for production:
    ```bash
    npm run build
    ```

## Deployment

This project is configured to deploy to **GitHub Pages** automatically.

1.  Push the code to your GitHub repository.
2.  Go to **Settings** > **Pages** in your repository.
3.  Under **Build and deployment**, select **GitHub Actions** as the source.
4.  The included workflow `.github/workflows/deploy.yml` will handle the rest.

## Customization

- Edit `src/components/*.tsx` to update content.
- Update `src/index.css` for global styles.
- Modify `tailwind.config.js` for theme customization.

## License

MIT
