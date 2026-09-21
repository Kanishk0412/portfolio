export type PortfolioProject = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  year: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
};

// Curated from Kanishk0412's original public repositories. Forks are
// intentionally excluded so every card represents work owned by this profile.
export const PROJECTS: PortfolioProject[] = [
  {
    title: "Dair Studios",
    description:
      "An immersive creative-studio website with project case studies, editorial content, smooth scrolling, theme support, and interactive 3D experiences.",
    tags: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Motion"],
    category: "Creative Studio",
    year: "2026",
    githubUrl: "https://github.com/Kanishk0412/dair-studios",
    liveUrl: "https://dair-studios.vercel.app",
    featured: true,
  },
  {
    title: "Cashio Gold",
    description:
      "A customer-facing gold buying and loan-release platform with live gold pricing, a valuation calculator, reviews, secure contact flows, and WhatsApp support.",
    tags: ["Next.js", "TypeScript", "Supabase", "Zod", "Framer Motion"],
    category: "Fintech Platform",
    year: "2026",
    githubUrl: "https://github.com/Kanishk0412/cashiogold",
    liveUrl: "https://cashiogold.vercel.app",
    featured: true,
  },
  {
    title: "PG Manager",
    description:
      "An end-to-end paying-guest management app for rooms, tenants, bookings, allotments, electricity readings, invoices, payments, and tenant self-service.",
    tags: ["Next.js", "TypeScript", "Prisma", "Recharts", "Zod"],
    category: "Property Management",
    year: "2026",
    githubUrl: "https://github.com/Kanishk0412/pg-manager",
    liveUrl: "https://pg-manager-psi.vercel.app",
    featured: true,
  },
  {
    title: "Developer Portfolio",
    description:
      "This production portfolio for development, speaking, and community work, with animated experiences, event embeds, and a server-secured contact API.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    category: "Portfolio",
    year: "2026",
    githubUrl: "https://github.com/Kanishk0412/portfolio",
    liveUrl: "https://kanishk-tyagi.vercel.app",
    featured: true,
  },
  {
    title: "Hack UIET",
    description:
      "The event website for a PClub and IEEE hackathon, built with responsive event sections, schedules, countdown experiences, and dark-mode support.",
    tags: ["React", "JavaScript", "Material UI", "Bootstrap"],
    category: "Event Platform",
    year: "2021",
    githubUrl: "https://github.com/Kanishk0412/hackuiet",
  },
  {
    title: "MakeMyTrip Clone",
    description:
      "A React-based recreation of a travel booking interface, developed to explore component-driven UI design and responsive frontend workflows.",
    tags: ["React", "JavaScript", "CSS", "Create React App"],
    category: "Frontend",
    year: "2022",
    githubUrl: "https://github.com/Kanishk0412/makemytrip-clone",
  },
  {
    title: "Machine Learning 2021",
    description:
      "A collection of Jupyter notebooks and experiments for exploring machine-learning datasets, model training, and core algorithm workflows.",
    tags: ["Python", "Jupyter Notebook", "Machine Learning"],
    category: "Data & ML",
    year: "2021",
    githubUrl: "https://github.com/Kanishk0412/machine-learning-2021",
  },
  {
    title: "Arduino RC Car",
    description:
      "A remotely controlled car prototype designed and simulated in Tinkercad, including the Arduino circuit and embedded C++ control code.",
    tags: ["Arduino", "C++", "Tinkercad", "Embedded Systems"],
    category: "Hardware",
    year: "2021",
    githubUrl: "https://github.com/Kanishk0412/arduino_RCcar",
    liveUrl: "https://www.tinkercad.com/things/9IELATzDdGJ-minor-project-rc-car",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
export const ARCHIVED_PROJECTS = PROJECTS.filter((project) => !project.featured);
