import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Disable ISR incremental cache to avoid WORKER_SELF_REFERENCE binding
  // which fails on first deploy. Our app uses fully dynamic rendering.
  incrementalCache: "dummy",
});
