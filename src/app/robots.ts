export const dynamic = 'force-static';

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://fairleap.faizath.com/sitemap.xml",
    host: "https://fairleap.faizath.com",
  };
}
