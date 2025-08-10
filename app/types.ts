export type Comic = "unread" | "read" | string;
export type Bundle = Record<string, Comic>;
export type Bundles = Record<string, Bundle>;
