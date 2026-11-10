import type { AstroIntegration } from 'astro';
import { PUBLISHED_DESIGNS, designPath } from './registry';

export default function designRoutes(): AstroIntegration {
  return {
    name: 'design-routes',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        for (const design of PUBLISHED_DESIGNS) {
          injectRoute({
            pattern: designPath(design),
            entrypoint: `./src/designs/${design.id}/page.astro`,
          });
        }
      },
    },
  };
}
