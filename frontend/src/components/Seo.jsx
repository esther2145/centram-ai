import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Centram Centre for Applied Artificial Intelligence";
const DEFAULT_DESCRIPTION =
  "Centram Centre for Applied Artificial Intelligence provides practical, domain-specific AI training for professionals and organisations in Uganda and across Africa.";

const pages = {
  "/": { title: `${SITE_NAME} | Uganda`, description: DEFAULT_DESCRIPTION },
  "/courses": {
    title: `Applied AI Courses | ${SITE_NAME}`,
    description: "Explore practical artificial intelligence, machine learning and data courses tailored to professional fields at Centram in Kampala, Uganda.",
  },
  "/courses/application-of-ai": {
    title: `Professional Applied AI Training | ${SITE_NAME}`,
    description: "Build practical artificial intelligence skills for finance, HR, public policy, healthcare, legal services and other professional fields.",
  },
  "/about": {
    title: `About | ${SITE_NAME}`,
    description: "Learn about Centram Centre for Applied Artificial Intelligence, a Kampala-based centre for domain-specific AI training, upskilling and reskilling.",
  },
  "/apply": {
    title: `Apply | ${SITE_NAME}`,
    description: "Apply for professional artificial intelligence and data training at Centram Centre for Applied Artificial Intelligence.",
  },
  "/contact": {
    title: `Contact | ${SITE_NAME}`,
    description: "Contact Centram Centre for Applied Artificial Intelligence in Kampala for course guidance, partnerships and corporate AI training.",
  },
};

function setMeta(selector, value) {
  const element = document.head.querySelector(selector);
  if (element) element.content = value;
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname] || { title: SITE_NAME, description: DEFAULT_DESCRIPTION };
    const canonicalUrl = new URL(pathname, window.location.origin).href;

    document.title = page.title;
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[name="twitter:title"]', page.title);
    setMeta('meta[name="twitter:description"]', page.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let ogUrl = document.head.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalUrl;

    let structuredData = document.head.querySelector("#centram-organization-schema");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "centram-organization-schema";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${window.location.origin}/#website`,
          name: SITE_NAME,
          alternateName: "Centram AI",
          url: `${window.location.origin}/`,
          publisher: { "@id": `${window.location.origin}/#organization` },
        },
        {
          "@type": "EducationalOrganization",
          "@id": `${window.location.origin}/#organization`,
          name: SITE_NAME,
          alternateName: "Centram AI",
          url: `${window.location.origin}/`,
          logo: `${window.location.origin}/assets/centram-logo-cropped.png`,
          description: DEFAULT_DESCRIPTION,
          email: "lab@centramai.com",
          telephone: "+256776726714",
          address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
        },
      ],
    });
  }, [pathname]);

  return null;
}
