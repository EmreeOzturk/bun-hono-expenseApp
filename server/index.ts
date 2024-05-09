import App from "./app";
Bun.serve({
  fetch: App.fetch,
});
