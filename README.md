# Lendsqr Frontend Assessment

## Project Overview

This project is an implementation of the Lendsqr frontend engineering assessment. It includes four main pages (Login, Dashboard, Users, User Details) with a mock data flow, responsive SCSS-based styling, and a modern React architecture.

## Tech Stack

- React
- TypeScript
- Vite
- React Router DOM
- SCSS
- Axios / @tanstack/react-query

## Setup Instructions

1. Clone the repository and navigate into it.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Architecture Decisions

- **Routing**: Centralized route mapping via `react-router-dom` to support guarded routes (where necessary) and nested layouts cleanly.
- **Styling**: SCSS modules and global styles leveraging flexbox/grid. Used predefined variables and mixins for theming corresponding to the Lendsqr design mockups.
- **State/Data**: Chosen to use `localStorage` for cross-page basic persistence as requested, alongside React components.
- **Folder Structure**: Feature-based page separation with global `components/`, `styles/`, and `utils/` ensuring high cohesion and low coupling.

## Deployment Link

TBD
# lendsqr-fe-test
