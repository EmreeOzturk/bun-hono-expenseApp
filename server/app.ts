import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import expensesRouter from "./routes/expenseRouter";
const App = new Hono();

App.use("*", logger());
const apiRoutes = App.basePath("/api").route("/expenses", expensesRouter);

App.get("*", serveStatic({ root: "./client/dist" }));
App.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default App;
export type ApiRoutes = typeof apiRoutes;
