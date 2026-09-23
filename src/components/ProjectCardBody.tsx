import type { ProjectMeta } from "@/lib/content";

const statusLabel: Record<string, string> = {
  active: "Active",
  shipped: "Shipped",
  archived: "Archived",
};

export default function ProjectCardBody({
  project,
  compact = false,
}: {
  project: ProjectMeta;
  compact?: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-3 text-xs text-zinc-500">
        <span className="rounded-full border border-black/10 px-2 py-0.5 dark:border-white/10">
          {statusLabel[project.status] ?? project.status}
        </span>
        <time>{project.date}</time>
      </div>
      <h2
        className={`mt-2 font-medium group-hover:underline ${
          compact ? "text-base" : "text-lg"
        }`}
      >
        {project.title}
      </h2>
      {project.category && (
        <p className="mt-0.5 text-xs text-zinc-500">/{project.category}</p>
      )}
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {project.summary}
      </p>
      {project.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-zinc-500 before:mr-1 before:content-['#']"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
