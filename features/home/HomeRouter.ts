import { Router, Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Home } from "./Home.tsx";
import { renderElement } from "../__common__/ui-utils.ts";

export const homeRouter = new Router();

homeRouter.get("/", (context: Context) => {
  context.response.body = renderElement(Home({ name: "Danny" }), context)
});