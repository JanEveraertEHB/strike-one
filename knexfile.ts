// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'better-sqlite3', 
  useNullAsDefault: true,
  connection: {
    filename: './db/footage.db',
  },
  migrations: {
    tableName: 'knex_migrations',
    // only run the compiled migrations, not the .ts sources sitting next to them
    loadExtensions: ['.js']
  }

};
