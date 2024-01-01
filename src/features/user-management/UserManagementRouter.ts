import { Router, Context, BodyForm } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderElement } from "../__common__/ui-utils.ts";
import { UserService } from "./UserManagementService.ts";
import { AllUsers } from "./AllUsers.tsx";
import { CreateUser } from "./CreateUser.tsx";
import { NewUser, isNewUser } from "./UserManagementDomain.ts";

export const userManagementRouter = new Router()
  // Get all users
  .get("/users", (context: Context) => {
    const users = UserService.getUsers()
    if (users.kind == 'err'){
      throw new Error('Something has gone terribly wrong.')
    }

    context.response.body = renderElement(AllUsers({ users: users.value }), context)
  })

  // Create a new user
  .get('/users/create', (context: Context) => {
    context.response.body = renderElement(CreateUser(), context)
  })
  .post('/users/create', async (context: Context) => {
    try {
      const bodyForm = context.request.body({ type: 'form' })
      const newUser = await buildNewUserFromBodyForm(bodyForm)
      const result = UserService.createUser(newUser)
      
      if (result.kind == 'err') {
        throw new Error('Something has gone terribly wrong.')
      }

      context.response.redirect('/users')
    } catch (e) {
      console.error(e)
      context.response.body = 'Something went wrong: ' + e.message
    }
  })


async function buildNewUserFromBodyForm(bodyForm: BodyForm): Promise<NewUser> {
  const params = await bodyForm.value
  const flatData = Object.fromEntries(params.entries())
  const result: Record<string, any> = {};

  for (const [path, value] of Object.entries(flatData)) {
    const pathParts = path.split('.');
    let currentPart = result;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];

      if (i === pathParts.length - 1) {
        if (part === 'role') {
          currentPart['roles'] = [value];
        } else {
          currentPart[part] = value;
        }
      } else {
        currentPart[part] = currentPart[part] || {};
        currentPart = currentPart[part];
      }
    }
  }

  if(!isNewUser(result)) {
    throw new Error('Invalid input.')
  }

  return result;
}