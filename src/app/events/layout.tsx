import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Events & Community",
  "Talks, hackathons, and community events where Kanishk Tyagi has spoken, judged, and mentored.",
  "/events",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
