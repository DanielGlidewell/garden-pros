const port = "8000"

export default {
  port: parseInt(port),
  db_dir: `${Deno.cwd()}/db`
}