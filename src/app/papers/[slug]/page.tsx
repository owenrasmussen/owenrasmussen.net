import { notFound } from "next/navigation";
import { getAllPapers, getPaperBySlug } from "@/lib/content";

export async function generateStaticParams() {
  return getAllPapers().map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);
  if (!paper) return {};
  return {
    title: `${paper.title} — Owen Rasmussen`,
    description: paper.summary,
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);
  if (!paper) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-sm text-zinc-500">
        <time>{paper.date}</time> · {paper.readingTime}
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{paper.title}</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {paper.summary}
      </p>
      <div
        className="prose prose-zinc mt-10 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: paper.html }}
      />
    </article>
  );
}
