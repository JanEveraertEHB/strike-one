import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('footage', function (table) {
    table.increments();
    table.string('eventname', 100);
    table.string('eventdate', 100);
    table.string('footageURI', 200);
  });
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.dropTable('footage');
}

