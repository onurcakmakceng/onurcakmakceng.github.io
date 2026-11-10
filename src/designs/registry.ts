export interface Design {
  id: string;
  label: string;
  swatch: readonly [background: string, accent: string];
}

export const DESIGNS: readonly Design[] = [
  { id: 'aluminum', label: 'Aluminum', swatch: ['#f5f5f7', '#0066cc'] },
  { id: 'classic', label: 'Classic', swatch: ['#18181c', '#38bdf8'] },
  { id: 'japandi', label: 'Japandi', swatch: ['#f2ede4', '#7c8a6e'] },
];

export const DEFAULT_DESIGN_ID = 'aluminum';

export const IS_DESIGN_SWITCHER_ENABLED = true;

export const DEFAULT_DESIGN: Design =
  DESIGNS.find((design) => design.id === DEFAULT_DESIGN_ID) ?? DESIGNS[0];

export const PUBLISHED_DESIGNS: readonly Design[] = IS_DESIGN_SWITCHER_ENABLED
  ? DESIGNS
  : [DEFAULT_DESIGN];

export function designPath(design: Design): string {
  return design === DEFAULT_DESIGN ? '/' : `/designs/${design.id}/`;
}

export function findDesignByPath(pathname: string): Design | undefined {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return PUBLISHED_DESIGNS.find((design) => designPath(design) === normalizedPath);
}
