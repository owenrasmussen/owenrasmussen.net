import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Owen Rasmussen`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-sm text-zinc-500">
        <time>{project.date}</time>
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {project.title}
      </h1>
      {project.category && (
        <p className="mt-1 text-sm text-zinc-500">/{project.category}</p>
      )}
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium underline"
        >
          Visit site →
        </a>
      )}
      <div
        className="prose prose-zinc mt-10 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: project.html }}
      />
    </article>
  );
}
