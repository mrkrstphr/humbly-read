import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  basename: "/humbly-read/",
  async prerender() {
    return ["/"];
  },
} satisfies Config;
