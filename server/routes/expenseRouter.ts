import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Rent",
    amount: 1000,
  },
  {
    id: 2,
    title: "Groceries",
    amount: 100,
  },
  {
    id: 3,
    title: "Gas",
    amount: 50,
  },
];

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(255),
  amount: z.number().int().positive(),
});

const createPostSchema = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>;

const expensesRouter = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .get("/:id{[1-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const data = c.req.valid("json");
    fakeExpenses.push({
      id: fakeExpenses.length + 1,
      ...data,
    });
    c.status(201);
    return c.json({});
  })
  .get("/total-spent", (c) => {
    const totalSpent = fakeExpenses.reduce((acc, e) => acc + e.amount, 0);
    return c.json({ totalSpent });
  })
  .delete("/:id{[1-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deleted = fakeExpenses.splice(index, 1);
    c.status(200);
    return c.json({ expense: deleted });
  });
//   .put("/:id{[1-9]+}", (c) => {
//     return c.json({});
//   });

export default expensesRouter;
