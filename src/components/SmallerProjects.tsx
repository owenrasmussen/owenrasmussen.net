"use client";

import { useState } from "react";
import type { ProjectMeta } from "@/lib/content";
import ProjectCardBody from "@/components/ProjectCardBody";

export default function SmallerProjects({
  projects,
}: {
  projects: ProjectMeta[];
}) {
  const [open, setOpen] = useState(false);

  if (projects.length === 0) return null;

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
        aria-expanded={open}
      >
        Smaller projects
        <span
          className={`inline-block transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ⌄
        </span>
      </button>

      {open && (
        <ul className="mt-4 divide-y divide-black/10 border-t border-black/10 dark:divide-white/10 dark:border-white/10">
          {projects.map((project) => (
            <li key={project.slug} className="py-5">
              <ProjectCardBody project={project} compact />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
