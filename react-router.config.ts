import type { Config } from "@react-router/dev/config";

export default {
  basename: "/humbly-read",
  async prerender() {
    return ["/"];
  },
} satisfies Config;
