import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "Kanishk Tyagi's background, skills, and community experience as a developer and tech speaker.",
  "/about",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
