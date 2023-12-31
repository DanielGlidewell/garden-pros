import { Database } from "https://deno.land/x/sqlite3@0.10.0/mod.ts";


export type Query = {
  sql: string;
  // deno-lint-ignore no-explicit-any
  parameters: any[];
};

export function migrateDatabase(db: Database, schema: Query[]): void {
  db.exec('PRAGMA journal_mode=WAL');
  let { user_version: migrationsApplied }: { user_version: number; } = db.prepare('PRAGMA user_version;').get() ?? { user_version: 0 };
  const migrationsToApply = schema.slice(migrationsApplied);

  migrationsToApply.forEach(
    function applyMigration(query: Query): void {
      if (query.parameters.length != 0) {
        throw new Error(`${applyMigration.name} isn't ready for params: ${JSON.stringify(query, null, 2)}`);
      }

      const stmt = db.prepare(query.sql);
      const _ = stmt.run();
      db.exec(`PRAGMA user_version=${++migrationsApplied}`);
    }
  );

  db.close();
}

export function sql(
  sourceParts: TemplateStringsArray,
  // deno-lint-ignore no-explicit-any
  ...substitutions: any[]) {
  let text = '';
  // deno-lint-ignore no-explicit-any
  const parameters: any[] = [];

  sourceParts.forEach((string, i) => {
    text += string;
    if (i < substitutions.length) {
      parameters.push(substitutions[i]);
      text += '?';
    }
  });

  return {
    sql: text,
    parameters
  };
}
