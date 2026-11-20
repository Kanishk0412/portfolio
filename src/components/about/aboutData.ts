import { INSTAGRAM_EVENTS } from "@/data/events";
import { PROJECTS } from "@/data/projects";

export const TOPMATE_URL = "https://topmate.io/kanishk_tyagi10/";
export const LINKEDIN_URL = "https://www.linkedin.com/in/kanishktyagi-connect";
export const INSTAGRAM_URL = "https://www.instagram.com/kanishkcodez/";

export const COMMUNITY_EXPERIENCE = [
  {
    period: "2022",
    role: "Lead",
    community: "GDG on Campus UIET",
    description:
      "Led the campus developer community and created opportunities for students to learn, collaborate, and build together.",
  },
  {
    period: "2023 – Present",
    role: "Core Team Member",
    community: "GDG Cloud Chandigarh",
    description:
      "Contributing to the Chandigarh developer ecosystem through community programs, technical sessions, and events.",
  },
  {
    period: "Community journey",
    role: "Community Member & Organizer",
    community: "MongoDB User Group Chandigarh",
    description:
      "Helping bring developers together for practical conversations around MongoDB, data, and modern application development.",
  },
  {
    period: "Current",
    role: "Community Contributor & Organizer",
    community: "AI Community Delhi",
    description:
      "Supporting AI-focused learning and events while connecting developers, speakers, and builders across the community.",
  },
];

export const TALK_TOPICS = [
  "Artificial intelligence, AI agents, and Google ADK",
  "Modern web and full-stack development",
  "Data analysis, Python, and developer tools",
];

export const SKILL_GROUPS = {
  Web: ["MERN Stack", "MongoDB", "Express.js", "React", "Node.js", "Next.js", "TypeScript"],
  Data: ["Python", "Power BI", "Data Analysis", "NumPy", "Pandas", "scikit-learn"],
  AI: ["Artificial Intelligence", "AI Agents"],
} as const;

const countRole = (role: string) =>
  INSTAGRAM_EVENTS.filter((event) => [event.role].flat().includes(role as never)).length;

export const EVENT_COUNTS = {
  total: INSTAGRAM_EVENTS.length,
  speaker: countRole("Speaker"),
  judge: countRole("Judge"),
  mentor: countRole("Mentor"),
  organizer: countRole("Organizer"),
};

export const PROJECT_COUNT = PROJECTS.length;

// Year of the newest event, and how many listed events fall in it.
export const LATEST_EVENT_YEAR = Number(INSTAGRAM_EVENTS[0].date.match(/\d{4}/)?.[0]);
export const EVENTS_IN_LATEST_YEAR = INSTAGRAM_EVENTS.filter((event) =>
  event.date.includes(String(LATEST_EVENT_YEAR))
).length;

/** Event photos where Kanishk is on stage, for the stacked photos in the intro. */
export const STAGE_PHOTOS = INSTAGRAM_EVENTS.flatMap((event) => {
  const roles = [event.role].flat();
  const cover = event.media.find((item) => item.type === "image");
  return cover && roles.includes("Speaker") ? [{ src: cover.src, title: event.title }] : [];
}).slice(0, 2);
