import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/papers", label: "Papers" },
  { href: "/projects", label: "Projects" },
];

export default function NavBar() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Owen Rasmussen
        </Link>
        <ul className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
