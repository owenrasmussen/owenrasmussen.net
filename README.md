Portfolio site — AI Sim writeups, philosophy papers, and projects/startups. Next.js (App Router) + Tailwind.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Publishing content

Content lives as markdown files with frontmatter — no CMS, no database.

- **Papers** (philosophy or AI sim): add a `.md` file to `content/papers/`
  ```yaml
  ---
  title: "Paper Title"
  date: "YYYY-MM-DD"
  category: "philosophy" # or "ai-sim"
  summary: "One-sentence summary shown in the list."
  draft: true # remove or set to false to publish
  ---
  Body in markdown.
  ```
- **Projects/startups**: add a `.md` file to `content/projects/`
  ```yaml
  ---
  title: "Project Title"
  date: "YYYY-MM-DD"
  status: "active" # active | shipped | archived
  summary: "One-sentence summary."
  url: "https://example.com" # optional
  tags: ["tag1", "tag2"]
  draft: true
  ---
  Body in markdown.
  ```

`draft: true` entries are visible in `npm run dev` but excluded from production builds — use it to stage content before publishing.

The AI Sim page (`/ai-sim`) automatically lists any paper with `category: "ai-sim"`. To embed a live demo there, edit `src/app/ai-sim/page.tsx`.

## Deploy

Push to a git repo and import it on [Vercel](https://vercel.com/new) — no config needed.
