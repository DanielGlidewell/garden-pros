import { Router, Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderElement } from "../__common__/ui-utils.ts";
import { UserService } from "./UserManagementService.ts";
import { AllUsers } from "./AllUsers.tsx";

export const userManagementRouter = new Router();

userManagementRouter.get("/users", async (context: Context) => {
  const users = await UserService.getUsers()
  if (users.kind == 'err'){
    throw new Error('Something has gone terribly wrong.')
  }

  context.response.body = renderElement(AllUsers({ users: users.value }), context)
});