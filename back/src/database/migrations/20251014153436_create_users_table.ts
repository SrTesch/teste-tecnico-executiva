import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // O método "up" é executado quando aplicamos a migration.
  return knex.schema.createTable('users', (table) => {
    // Cria um campo 'id' autoincrementável como chave primária.
    table.increments('id').primary();
    
    // Cria um campo 'email' do tipo string, que não pode ser nulo e deve ser único.
    table.string('email').notNullable().unique();

    // Cria um campo 'password' do tipo string, que não pode ser nulo.
    table.string('password').notNullable();

    // Cria um campo 'created_at' com o timestamp de quando o registro foi criado.
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  // O método "down" é executado quando revertemos a migration.
  return knex.schema.dropTable('users');
}