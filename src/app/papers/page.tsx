import Link from "next/link";
import { getAllPapers } from "@/lib/content";

export const metadata = {
  title: "Papers — Owen Rasmussen",
};

const categoryLabel: Record<string, string> = {
  philosophy: "Philosophy",
  "ai-sim": "AI Sim",
};

export default function PapersPage() {
  const papers = getAllPapers();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Papers</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Philosophy papers and technical writeups, including the paper on the AI sim.
      </p>

      <ul className="mt-10 divide-y divide-black/10 dark:divide-white/10">
        {papers.map((paper) => (
          <li key={paper.slug} className="py-6">
            <Link href={`/papers/${paper.slug}`} className="group block">
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="rounded-full border border-black/10 px-2 py-0.5 dark:border-white/10">
                  {categoryLabel[paper.category] ?? paper.category}
                </span>
                <time>{paper.date}</time>
                <span>·</span>
                <span>{paper.readingTime}</span>
              </div>
              <h2 className="mt-2 text-lg font-medium group-hover:underline">
                {paper.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {paper.summary}
              </p>
            </Link>
          </li>
        ))}
        {papers.length === 0 && (
          <li className="py-6 text-sm text-zinc-500">No papers published yet.</li>
        )}
      </ul>
    </div>
  );
}
