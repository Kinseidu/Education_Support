# Token Pay Now Web Experience

This repository contains the public-facing website for the Adomako EduSupport Foundation. The frontend is built with Vite + React + TypeScript, Tailwind CSS, and the shadcn/ui component library. A companion Express + MongoDB API lives in the `server/` directory.

## Getting Started

```bash
# install dependencies for the frontend
npm install

# run the Vite dev server
npm run dev

# open http://localhost:8080 in your browser
```

The API runs separately:

```bash
cd server
npm install
npm run dev
```

By default, the API listens on `http://localhost:5000`. Set `VITE_API_URL` in a `.env` file at the repo root if you need to point the frontend to a different backend origin.

## Project Structure

```
├── src/               # React application
├── public/            # Static assets (favicons, robots.txt, etc.)
├── server/            # Express + MongoDB backend
└── tailwind.config.ts # Tailwind design tokens & shadcn setup
```

## Available Scripts

- `npm run dev` – start the frontend in development mode
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint checks

## Contributing

1. Create a feature branch: `git checkout -b feature/your-change`
2. Make your updates and ensure `npm run lint` passes.
3. Commit with a descriptive message.
4. Open a pull request.

## License

This project is maintained by the Adomako EduSupport Foundation. Reach out to the team for questions about usage or contributions.
