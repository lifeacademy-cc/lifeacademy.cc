import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    placement: "server",
    minify: true,
  },
};

export default config;
