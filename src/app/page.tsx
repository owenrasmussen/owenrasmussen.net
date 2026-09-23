import Link from "next/link";

const sections = [
  {
    href: "/papers",
    title: "Papers",
    description: "Philosophy papers and technical writeups.",
  },
  {
    href: "/projects",
    title: "Projects",
    description: "Things I've built, from startups to AI research.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Owen Rasmussen</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        I&apos;m 19, studying philosophy at Utah Valley University. I like
        building things. Right now that&apos;s mostly startups, currently{" "}
        <Link href="/projects/lazy-booking" className="underline underline-offset-2">
          Lazy Booking
        </Link>
        , alongside AI research and the philosophy papers you&apos;ll find
        here.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-1">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group block rounded-lg border border-black/10 p-6 transition-colors hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
          >
            <h2 className="text-lg font-medium group-hover:underline">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
