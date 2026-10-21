import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('footage', function (table) {
      table.boolean("archived").defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('footage', function (table) {
      table.dropColumn("archived")
    })
}

