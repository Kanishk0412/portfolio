import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact",
  "Get in touch with Kanishk Tyagi about speaking, freelance work, or a project.",
  "/contact",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
