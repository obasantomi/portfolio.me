import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const socials = [
  {
    icon: <FaXTwitter size={14} />,
    label: "Twitter",
    href: "https://t.co/S4cxW6Q8Bl",
  },
  {
    icon: <FaLinkedin size={14} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tomilola-obasan",
  },
  {
    icon: <FaGithub size={14} />,
    label: "GitHub",
    href: "https://github.com/obasantomi",
  },
  {
    icon: <MdEmail size={14} />,
    label: "Mail",
    href: "mailto:obasantomilola@gmail.com",
  },
];

export const SocialLinks = () => {
  return (
    <div className="flex justify-center flex-wrap items-center gap-2">
      {socials.map(({ icon, label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"
        >
          {icon}
          {label}
        </a>
      ))}
    </div>
  );
};
