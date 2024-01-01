import { Router, Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { WorkOrders } from "./WorkOrders.tsx";
import { renderElement } from "../__common__/ui-utils.ts";

export const workOrdersRouter = new Router();

workOrdersRouter.get("/workorders", (context: Context) => {
  context.response.body = renderElement(WorkOrders(), context)
});