import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PAPERS_DIR = path.join(CONTENT_DIR, "papers");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

export type PaperCategory =
  | "philosophy"
  | "ai-sim"
  | "essay"
  | "ai-safety"
  | "ai-policy"
  | "economics";

export type PaperMeta = {
  slug: string;
  title: string;
  date: string;
  categories: PaperCategory[];
  summary: string;
  draft?: boolean;
  readingTime: string;
};

export type Paper = PaperMeta & { html: string };

export type ProjectStatus = "active" | "shipped" | "archived";

export type ProjectMeta = {
  slug: string;
  title: string;
  date: string;
  status: ProjectStatus;
  category?: string;
  summary: string;
  url?: string;
  tags: string[];
  draft?: boolean;
  /** false = show in the list as plain text, no link to a detail page */
  link?: boolean;
};

export type Project = ProjectMeta & { html: string };

function listSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/** `category` in frontmatter may be a single value or a list. */
function toCategories(value: unknown): PaperCategory[] {
  return (Array.isArray(value) ? value : [value]).filter(Boolean) as PaperCategory[];
}

const isProd = process.env.NODE_ENV === "production";

function includeDraft(draft: boolean | undefined): boolean {
  return isProd ? !draft : true;
}

export function getAllPapers(): PaperMeta[] {
  return listSlugs(PAPERS_DIR)
    .map((slug) => {
      const raw = fs.readFileSync(path.join(PAPERS_DIR, `${slug}.md`), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        categories: toCategories(data.category),
        summary: data.summary as string,
        draft: Boolean(data.draft),
        readingTime: readingTime(content).text,
      };
    })
    .filter((paper) => includeDraft(paper.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPaperBySlug(slug: string): Promise<Paper | null> {
  const filePath = path.join(PAPERS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    categories: toCategories(data.category),
    summary: data.summary as string,
    draft: Boolean(data.draft),
    readingTime: readingTime(content).text,
    html: processed.toString(),
  };
}

export function getAllProjects(): ProjectMeta[] {
  return listSlugs(PROJECTS_DIR)
    .map((slug) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        status: data.status as ProjectStatus,
        category: data.category as string | undefined,
        summary: data.summary as string,
        url: data.url as string | undefined,
        tags: (data.tags as string[]) ?? [],
        draft: Boolean(data.draft),
        link: data.link === false ? false : true,
      };
    })
    .filter((project) => includeDraft(project.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    status: data.status as ProjectStatus,
    summary: data.summary as string,
    url: data.url as string | undefined,
    tags: (data.tags as string[]) ?? [],
    draft: Boolean(data.draft),
    html: processed.toString(),
  };
}
