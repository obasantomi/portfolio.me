export const profile = {
  name: "Tomilola Obasan",
  shortName: "Tomilola",
  role: "Full-stack software engineer",
  location: "Lagos, Nigeria",
  timeZone: "Africa/Lagos",
  availability: "Available now for new roles",
  availabilityDetail: "Open to full-time and contract roles, remote or in Lagos.",
  email: "obasantomilola@gmail.com",
  resumeUrl: "/resume/Obasan_Tomilola_Resume.pdf",
  education: {
    degree: "B.Sc. Computer Science",
    school: "Covenant University",
  },
} as const;

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tomilola-obasan",
    handle: "in/tomilola-obasan",
  },
  {
    label: "GitHub",
    href: "https://github.com/obasantomi",
    handle: "obasantomi",
  },
  {
    label: "X",
    href: "https://t.co/S4cxW6Q8Bl",
    handle: "Twitter / X",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2348134595301",
    handle: "+234 813 459 5301",
  },
] as const;

export const navItems = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
