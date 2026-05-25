export type Comic = 'unread' | 'read' | string;
export type Bundle = Record<string, Comic>;
export type BundleEntry = {
  purchased: string | null;
  source: 'humblebundle' | 'fanatical' | null;
  items: Bundle;
};
export type Bundles = Record<string, BundleEntry>;
