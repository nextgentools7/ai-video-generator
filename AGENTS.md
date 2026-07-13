# Vanta Project Guide

## Overview

Vanta is a focused, single-page AI video creation interface. It presents three creation modes—prompt, image, and script—alongside a product landing experience and two simple pricing tiers.

## Architecture

- `src/routes/__root.tsx` defines the document shell, global metadata, and stylesheet import.
- `src/routes/index.tsx` contains the landing page, generator workspace, interactive mode state, upload preview, simulated generation states, feature explanations, and pricing.
- `src/styles.css` contains the complete visual system, responsive layout, animation, and component styling.
- `src/router.tsx` configures TanStack Router using its generated route tree.
- `public/` contains static assets served directly by Netlify.

## Technologies

- TanStack Start and TanStack Router
- React 19 with TypeScript
- Tailwind CSS 4 tooling with custom global CSS
- Lucide React icons
- Vite and the Netlify TanStack Start adapter

## Conventions

- Use PascalCase for React components and camelCase for functions and state.
- Keep route components in `src/routes/` and use file-based routing conventions.
- Prefer semantic HTML, accessible labels, visible focus behavior, and responsive layouts.
- Keep colors and typography centralized through CSS variables and global classes in `src/styles.css`.
- Maintain the deliberately focused product scope; avoid adding dashboards, social features, editors, blogs, or unrelated routes.

## Product Decisions

- The generator UI is an interactive front-end concept. Generation transitions through idle, loading, and preview states without calling an external video model.
- Uploaded images are previewed locally with `FileReader` and are not persisted or transmitted.
- The two plan limits are presented as 8 seconds for Free and 25 seconds for Premium.
- The interface uses a cinematic, editorial direction with warm neutrals and a single chartreuse accent rather than a conventional blue-purple AI palette.

## Local Development

Run `npm run dev` for local development. Netlify deployment uses the build and publish settings in `netlify.toml`.
