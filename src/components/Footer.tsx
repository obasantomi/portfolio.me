import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const socials = [
  { href: "https://github.com/obasantomi", icon: FaGithub, label: "GitHub" },
  {
    href: "https://linkedin.com/in/tomilola-obasan",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  { href: "https://wa.me/2348134595301", icon: FaWhatsapp, label: "WhatsApp" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 md:px-8">
        <p className="text-sm text-slate-600">
          © 2025 Tomilola Obasan. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 transition hover:text-slate-900"
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
