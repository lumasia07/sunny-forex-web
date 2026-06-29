import { useEffect } from 'react';
import { fetchFromApi } from '../lib/api';

export function useSeo(pageSlug: string) {
  useEffect(() => {
    fetchFromApi<any>(`seo/${pageSlug}`)
      .then(seo => {
        if (seo) {
          if (seo.title) {
            document.title = seo.title;
          }

          if (seo.description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
              metaDesc = document.createElement('meta');
              metaDesc.setAttribute('name', 'description');
              document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', seo.description);
          }

          if (seo.canonical_url) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
              canonical = document.createElement('link');
              canonical.setAttribute('rel', 'canonical');
              document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', seo.canonical_url);
          }

          if (seo.json_ld_schema) {
            let scriptId = `jsonld-${pageSlug}`;
            let existingScript = document.getElementById(scriptId);
            if (existingScript) {
              existingScript.remove();
            }
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.text = JSON.stringify(seo.json_ld_schema);
            document.head.appendChild(script);
          }
        }
      })
      .catch(err => console.warn(`SEO fetch failed for slug ${pageSlug}:`, err));
  }, [pageSlug]);
}
