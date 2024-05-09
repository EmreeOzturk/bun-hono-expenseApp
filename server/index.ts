import App from "./app";
const server = Bun.serve({
  fetch: App.fetch,
  port: 3000,
  hostname: "127.0.0.1",
});

console.log(`Server running at http://${server.hostname}:${server.port}`);
