import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('footage', function (table) {
    table.renameColumn('eventname', 'eventName');
    table.renameColumn('eventdate', 'eventDate');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('footage', function (table) {
    table.renameColumn('eventName', 'eventname');
    table.renameColumn('eventDate', 'eventdate');
  });
}

