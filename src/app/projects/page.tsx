import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import ProjectCardBody from "@/components/ProjectCardBody";
import SmallerProjects from "@/components/SmallerProjects";

export const metadata = {
  title: "Projects — Owen Rasmussen",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.link !== false);
  const smaller = projects.filter((p) => p.link === false);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Things I&apos;ve built — startups, AI research, and everything else.
      </p>

      <ul className="mt-10 divide-y divide-black/10 dark:divide-white/10">
        {featured.map((project) => (
          <li key={project.slug} className="py-6">
            <Link href={`/projects/${project.slug}`} className="group block">
              <ProjectCardBody project={project} />
            </Link>
          </li>
        ))}
        {featured.length === 0 && (
          <li className="py-6 text-sm text-zinc-500">No projects published yet.</li>
        )}
      </ul>

      <SmallerProjects projects={smaller} />
    </div>
  );
}
