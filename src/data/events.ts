import type { EventMedia, EventRole } from "@/components/EventCard";

export interface EventEntry {
  title: string;
  role: EventRole | EventRole[];
  organization: string;
  location: string;
  date: string;
  description: string;
  media: EventMedia[];
  instagramUrls: string[];
}

const postImages = (code: string, count: number, startAt = 1): EventMedia[] =>
  Array.from({ length: count }, (_, offset) => {
    const slide = startAt + offset;
    return {
      type: "image",
      src: slide === 1 ? `/events/${code}.jpg` : `/events/${code}-${slide}.jpg`,
    };
  });

const postVideo = (code: string): EventMedia[] => [
  {
    type: "video",
    src: `/events/${code}.mp4`,
    poster: `/events/${code}.jpg`,
  },
];

const postLinks = (...codes: string[]) =>
  codes.map((code) => `https://www.instagram.com/p/${code}/`);

/**
 * Unique events from @kanishkcodez, newest first. Non-event posts are excluded.
 * Announcement and recap posts for the same event are merged into one entry;
 * every source post remains represented by its locally hosted cover image.
 */
export const INSTAGRAM_EVENTS: EventEntry[] = [
  {
    title: "Build Arena 2026 — Judge",
    role: "Judge",
    organization: "Hack Briven · Serverpod · Azure Developer Community",
    location: "Microsoft Office, Sovereign Noida",
    date: "Oct 30, 2026",
    description:
      "Joined the judging panel for Build Arena 2026, presented by Hack Briven and supported by Microsoft Azure, as innovators showcased their ideas and competed to build something extraordinary.",
    media: [],
    instagramUrls: postLinks("DfFh6uRE1ug"),
  },
  {
    title: "MongoDB.local Bengaluru",
    role: "Attendee",
    organization: "MongoDB",
    location: "Bengaluru, India",
    date: "Sep 26, 2026",
    description:
      "Attended MongoDB.local Bengaluru for its technical sessions and conversations with the developer community.",
    media: postImages("DdwuCX-k-AL", 1),
    instagramUrls: postLinks("DdwuCX-k-AL"),
  },
  {
    title: "AI Community Delhi Speaker Session",
    role: "Organizer",
    organization: "AI Community Delhi",
    location: "Rez Cybercity",
    date: "Sep 25, 2026",
    description:
      "Organized a speaker session with AI Community Delhi at Rez Cybercity, bringing together a great crowd for an energetic tech talk.",
    media: postImages("DdvZWabk4RQ", 1),
    instagramUrls: postLinks("DdvZWabk4RQ"),
  },
  {
    title: "Build with AI at Google Gurugram",
    role: "Organizer",
    organization: "AI Community Delhi · Google",
    location: "Google Office, Gurugram",
    date: "Sep 22, 2026",
    description:
      "Co-organized Build with AI at the Google office in Gurugram with AI Community Delhi, a day of packed sessions and hands-on building.",
    media: postImages("DdlpnpuGacC", 1),
    instagramUrls: postLinks("DdlpnpuGacC"),
  },
  {
    title: "GeeksforGeeks Hackathon — Judge",
    role: "Judge",
    organization: "GeeksforGeeks · Hack Briven",
    location: "Community Hackathon",
    date: "Sep 21, 2026",
    description:
      "Judged innovative student projects at a GeeksforGeeks hackathon organized by the Hack Briven community, with a focus on strong ideas, thoughtful execution, and real-world impact.",
    media: postImages("DdioLVdmSp2", 5),
    instagramUrls: postLinks("DdioLVdmSp2"),
  },
  {
    title: "MongoDB User Group Chandigarh Meetup",
    role: "Organizer",
    organization: "MongoDB User Group Chandigarh · Softobiz",
    location: "Chandigarh, India",
    date: "Sep 20, 2026",
    description:
      "Helped organize the MongoDB User Group Chandigarh meetup at Softobiz, bringing developers together for practical learning, conversations, and community building.",
    media: postImages("DdhHbKpGRd8", 3),
    instagramUrls: postLinks("DdhHbKpGRd8"),
  },
  {
    title: "Technophilia — Web & AI Session",
    role: ["Speaker", "Judge"],
    organization: "Technophilia · CVS, University of Delhi",
    location: "Delhi, India",
    date: "Sep 20, 2026",
    description:
      "Spoke about Web and AI at Technophilia and joined the judging panel to evaluate student hackathon projects.",
    media: postImages("DdhDgRMGflv", 5),
    instagramUrls: postLinks("DdhDgRMGflv"),
  },
  {
    title: "Agentic AI Mornings — Community Update",
    role: "Community",
    organization: "CNCG Gurugram",
    location: "Gurugram, India",
    date: "Aug 1, 2026",
    description:
      "A community update from Agentic AI Mornings and an invitation to join CNCG Gurugram for the next gathering.",
    media: postVideo("DbgBwHXKXiu"),
    instagramUrls: postLinks("DbgBwHXKXiu"),
  },
  {
    title: "Build with AI — Agentic AI with Google ADK",
    role: "Speaker",
    organization: "AI Community Ghaziabad · OpsTree Global",
    location: "OpsTree Global",
    date: "May 23, 2026",
    description:
      "Presented an introduction to Agentic AI using Google ADK and Gemini at Build with AI, with practical ideas for turning AI concepts into working systems. The announcement and event recap are combined here.",
    media: [
      ...postImages("DY91AUaGp7L", 7),
      ...postImages("DYi_IHxoFvs", 1),
    ],
    instagramUrls: postLinks("DY91AUaGp7L", "DYi_IHxoFvs"),
  },
  {
    title: "HackDays Delhi 2026 — Mentor",
    role: "Mentor",
    organization: "HackDays Delhi",
    location: "Delhi, India",
    date: "Jun 13, 2026",
    description:
      "Mentored participating teams at HackDays Delhi 2026 as they developed, tested, and refined their projects.",
    media: postImages("DYbV86PqCdI", 1),
    instagramUrls: postLinks("DYbV86PqCdI"),
  },
  {
    title: "Hackathon at Masters’ Union",
    role: ["Speaker", "Judge"],
    organization: "Hack Briven · Masters’ Union",
    location: "Masters’ Union",
    date: "May 11, 2026",
    description:
      "Spoke on how AI is revolutionizing web development and judged the hackathon projects built by participating teams.",
    media: postImages("DYNAyVimT63", 8),
    instagramUrls: postLinks("DYNAyVimT63"),
  },
  {
    title: "Career Growth & Corporate Trends Session",
    role: "Speaker",
    organization: "SBE UIET · Panjab University",
    location: "Chandigarh, India",
    date: "May 9, 2026",
    description:
      "Shared practical insights on career growth and changing corporate trends with students at UIET, Panjab University.",
    media: postImages("DYHfiLYmS5Y", 9),
    instagramUrls: postLinks("DYHfiLYmS5Y"),
  },
  {
    title: "Web & Cyber Intelligence Workshop",
    role: "Speaker",
    organization: "Devantra Innovations · ACIC RISE",
    location: "CGC Landran, Chandigarh",
    date: "Apr 9, 2026",
    description:
      "Delivered a hands-on workshop with Kastab covering web development, cyber security, and cyber intelligence. The announcement, workshop details, and follow-up highlights are merged into this single entry.",
    media: [
      ...postImages("DYDJkj0EwyT", 9),
      ...postImages("DXKeKvKE1sl", 1),
      ...postVideo("DWqdwrKjDuC"),
      ...postImages("DWnwaAnCRns", 1),
    ],
    instagramUrls: postLinks("DYDJkj0EwyT", "DXKeKvKE1sl", "DWqdwrKjDuC", "DWnwaAnCRns"),
  },
  {
    title: "Technovate 3.0",
    role: ["Mentor", "Judge"],
    organization: "GDG On Campus UIET · Mechnacia UIET",
    location: "UIET Panjab University, Chandigarh",
    date: "Apr–May 2026",
    description:
      "Mentored teams and joined the judging panel for Technovate 3.0, evaluating student ideas, technical execution, and real-world usefulness. The reveal and event recap are combined here.",
    media: [
      ...postImages("DYCrqUamZgH", 9),
      ...postImages("DXKcaqzD3ed", 1),
    ],
    instagramUrls: postLinks("DYCrqUamZgH", "DXKcaqzD3ed"),
  },
  {
    title: "Bharat Tech Xperience Hackathon 3.0",
    role: "Mentor",
    organization: "Bharat Tech Xperience · SVIET",
    location: "SVIET",
    date: "May 7, 2026",
    description:
      "Mentored teams at Bharat Tech Xperience Hackathon 3.0, helping participants shape their ideas and approach technical challenges.",
    media: postImages("DYAt4ghk4_T", 11),
    instagramUrls: postLinks("DYAt4ghk4_T"),
  },
  {
    title: "Web Development Basics at CGC Landran",
    role: "Speaker",
    organization: "SheBuilds CGC · ECE Department",
    location: "CGC Landran, Chandigarh",
    date: "May 6, 2026",
    description:
      "Led an introductory web development session at CGC Landran, invited by SheBuilds CGC and the ECE department.",
    media: postImages("DX_18Y9GVn2", 7),
    instagramUrls: postLinks("DX_18Y9GVn2"),
  },
  {
    title: "Code Nakshatra 2.0",
    role: ["Mentor", "Judge"],
    organization: "Code Rangers · TIIPS",
    location: "Greater Noida, India",
    date: "May 7–8, 2026",
    description:
      "Joined this 24-hour campus hackathon as a mentor and judge, guiding builders and reviewing the impressive projects they created in a short span of time. The announcement and recap are combined here.",
    media: [
      ...postImages("Ddo9XT2kzQz", 1),
      ...postImages("DX--oasCRLd", 1),
    ],
    instagramUrls: postLinks("Ddo9XT2kzQz", "DX--oasCRLd"),
  },
  {
    title: "Inception-X — Web Development & Web3",
    role: "Community",
    organization: "EPC · CGC Landran",
    location: "CGC Landran, Chandigarh",
    date: "Mar 28, 2026",
    description:
      "A hands-on community workshop exploring web development and Web3 while giving students a practical glimpse into emerging technologies. The announcement and highlights are combined here.",
    media: [
      ...postVideo("DWfjN88E6le"),
      ...postImages("DWWpVFaE-Fj", 1),
    ],
    instagramUrls: postLinks("DWfjN88E6le", "DWWpVFaE-Fj"),
  },
  {
    title: "Electrothon 8.0 at NIT Hamirpur",
    role: "Judge",
    organization: "SPEC · NIT Hamirpur",
    location: "Hamirpur, India",
    date: "Mar 13–15, 2026",
    description:
      "Joined the judging panel for Electrothon 8.0, meeting ambitious builders and reviewing solutions developed during the NIT Hamirpur hackathon. The judge reveal and recap are combined here.",
    media: [
      ...postImages("DWGzxvaCVrp", 9),
      ...postImages("DV0EtqPE5q5", 1),
    ],
    instagramUrls: postLinks("DWGzxvaCVrp", "DV0EtqPE5q5"),
  },
  {
    title: "Hack Heist 2K26",
    role: "Mentor",
    organization: "Hack Heist",
    location: "Hackathon Community",
    date: "Mar 19, 2026",
    description:
      "Joined Hack Heist 2K26 as a mentor, supporting teams as they turned early ideas into working projects.",
    media: postImages("DWEe58wCU2V", 1),
    instagramUrls: postLinks("DWEe58wCU2V"),
  },
  {
    title: "Hack-N-Win 3.0",
    role: "Mentor",
    organization: "D4 Community · CGC University Mohali",
    location: "Mohali, India",
    date: "Mar 7–8, 2026",
    description:
      "Returned to Hack-N-Win as a mentor to guide student innovators from early concepts toward practical solutions. The mentor reveal, invitation, and reflection posts are combined here.",
    media: [
      ...postImages("DVx5514iebt", 4),
      ...postImages("DVX2lB4iQDj", 4),
      ...postImages("DVXov41EgzB", 1),
    ],
    instagramUrls: postLinks("DVx5514iebt", "DVX2lB4iQDj", "DVXov41EgzB"),
  },
  {
    title: "AI Summit Delhi",
    role: "Attendee",
    organization: "AI Summit",
    location: "Delhi, India",
    date: "Feb 2026",
    description:
      "Explored new language models, real-world deployments, enterprise use cases, and the shift from AI experimentation to implementation. Both summit reflections are combined here.",
    media: [
      ...postVideo("DVG5y2NEh6x"),
      ...postImages("DVC49RKCc7H", 5),
    ],
    instagramUrls: postLinks("DVG5y2NEh6x", "DVC49RKCc7H"),
  },
  {
    title: "GDG On Campus Hackathon — SCRIET",
    role: ["Speaker", "Judge"],
    organization: "GDG On Campus SCRIET · code.scriet",
    location: "Meerut, India",
    date: "Feb 21, 2026",
    description:
      "Presented the latest Firebase AI innovations and judged projects that combined AI, creativity, and practical problem-solving.",
    media: postImages("DVBq0Yhkoqb", 9),
    instagramUrls: postLinks("DVBq0Yhkoqb"),
  },
  {
    title: "Bharti Foundation School Hackathon",
    role: ["Speaker", "Judge"],
    organization: "Gyan Bharti School · Bharti Foundation",
    location: "Amritsar, India",
    date: "Feb 21, 2026",
    description:
      "Spoke with students from classes 9–12 about skills, careers, and AI, then joined the judging panel for their hackathon projects.",
    media: postImages("DVAbBrHjnq2", 5),
    instagramUrls: postLinks("DVAbBrHjnq2"),
  },
];

const FEATURED_EVENT_TITLES = new Set([
  "GeeksforGeeks Hackathon — Judge",
  "Build with AI — Agentic AI with Google ADK",
  "Hackathon at Masters’ Union",
]);

export const FEATURED_EVENTS = INSTAGRAM_EVENTS.filter((event) =>
  FEATURED_EVENT_TITLES.has(event.title)
);
