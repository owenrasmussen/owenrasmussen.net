const socials = [
  { href: "https://www.instagram.com/0wen.ras/", label: "Instagram" },
  { href: "https://www.linkedin.com/in/owen-rasmussen-16bbb43a7/", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-8 text-sm text-zinc-500">
        <span>© {new Date().getFullYear()} Owen Rasmussen</span>
        <ul className="flex gap-6">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
