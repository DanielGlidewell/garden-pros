import { ensureDir } from "https://deno.land/std@0.176.0/fs/ensure_dir.ts";
import { Application, Context, Next, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { React, renderToStaticMarkup } from "./deps.ts";
import { homeRouter } from "./features/home/HomeRouter.ts";
import { workOrdersRouter } from "./features/work-orders/WorkOrderRouter.ts";
import { userManagementRouter } from "./features/user-management/UserManagementRouter.ts";
import { migrateUserDatabase } from "./features/user-management/UserManagementDatabase.ts";
import config from "./config.ts";

const app = new Application();


// ---------------------
// | Custom Middleware |
// ---------------------
// Allows JSX components to be rendered to the client as static markup.
app.use(async function renderJsxMiddleware(context: Context, next: Next) {
  await next();

  if (React.isValidElement(context.response.body)) {
    context.response.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(
      context.response.body
    );

    context.response.type = 'text/html; charset=utf-8';
  }
});

// Convenience function to check if the request has the HTMX HX-Boosted header
app.use(async function checkRequestHtmxBoosted(context: Context, next: Next){
  context.state.isHxBoosted = !!context.request.headers.has('HX-Boosted');
  await next();
});


// -------------
// | Databases |
// -------------
await ensureDir(config.db_dir)
migrateUserDatabase();


// -----------------
// | Static Assets |
// -----------------
const assets = new Router().get(
  "/public/:path+", 
  async (context) => {
    await context.send({
      root: Deno.cwd(),
    });
  }
);

app.use(assets.routes(), assets.allowedMethods())


// ----------------
// | Route Config |
// ----------------
app.use(homeRouter.routes(), homeRouter.allowedMethods());
app.use(workOrdersRouter.routes(), workOrdersRouter.allowedMethods())
app.use(userManagementRouter.routes(), userManagementRouter.allowedMethods())


// ----------------
// | Start Server |
// ----------------
app.listen({ port: config.port});
console.log(`server is running on port: ${config.port}`);