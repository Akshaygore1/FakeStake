import { useEffect, useMemo } from "react";

export interface SEOProps {
  title: string;
  description: string;
  url: string;
  keywords?: string[];
  image?: string;
  structuredData?: Record<string, unknown>;
}

export function SEO({
  title,
  description,
  url,
  keywords = [],
  image = "https://fakestake.fun/opengraph.png",
  structuredData,
}: SEOProps) {
  const structuredDataJson = useMemo(
    () => (structuredData ? JSON.stringify(structuredData) : null),
    [structuredData]
  );

  useEffect(() => {
    document.head
      .querySelectorAll('[data-fakestake-seo="structured-data"]')
      .forEach((element) => element.remove());

    if (structuredDataJson) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = structuredDataJson;
      script.setAttribute("data-fakestake-seo", "structured-data");
      document.head.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [structuredDataJson]);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 ? (
        <meta name="keywords" content={keywords.join(", ")} />
      ) : null}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Fake Stake" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@fakestake" />
    </>
  );
}
