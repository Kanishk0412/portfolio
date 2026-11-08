import type { Metadata } from "next";

export const SITE_URL = "https://kanishk-tyagi.vercel.app";
export const SITE_NAME = "Kanishk Tyagi";
export const SHARE_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Kanishk Tyagi, Developer, Tech Speaker and Community Builder",
};

/** Search and link-preview details for one page. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: SITE_NAME, type: "website", images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [SHARE_IMAGE] },
  };
}
