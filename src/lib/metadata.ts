import type { Metadata } from "next";

export const SITE_URL = "https://kanishk-tyagi.vercel.app";
export const SITE_NAME = "Kanishk Tyagi";

/** Search and link-preview details for one page. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: SITE_NAME, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
