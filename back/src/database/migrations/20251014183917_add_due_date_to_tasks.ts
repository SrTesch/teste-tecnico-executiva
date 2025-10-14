import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('tasks', (table) => {
    table.timestamp('due_date').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('tasks', (table) => {
    table.dropColumn('due_date');
  });
}