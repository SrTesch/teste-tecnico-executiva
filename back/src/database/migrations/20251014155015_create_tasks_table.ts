import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');

    table.enu('status', ['pendente', 'em andamento', 'concluída']).defaultTo('pendente');
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('conclusion_at').nullable();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}