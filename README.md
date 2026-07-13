# Vanta AI Video Generator

Vanta is a modern, focused AI video generator experience for creating video from a text prompt, an uploaded image, or a complete script. The single-page product site combines a polished landing page with an interactive creation workspace and simple Free and Premium pricing.

## Features

- Prompt-to-video creation with a direct natural-language input
- Image-to-video creation with local image preview and optional motion direction
- Script-to-video creation for longer narrative input
- Responsive idle, generation, and completed preview states
- Free plan with videos up to 8 seconds
- Premium plan with videos up to 25 seconds
- Responsive, accessible cinematic interface

## Technology

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Vite 7
- Tailwind CSS 4 tooling and custom CSS
- Lucide React icons
- Netlify deployment adapter

## Run Locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The current generator is a front-end product experience with simulated generation feedback. Connecting a production video model requires adding a secure server-side generation endpoint and provider credentials.
