import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Projects",
  "Web applications and experiments built by Kanishk Tyagi, with live demos and source code.",
  "/projects",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
