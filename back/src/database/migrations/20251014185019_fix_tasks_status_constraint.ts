import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

  await knex.schema.renameTable("tasks", "_tasks_old");

  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description");

    table.enum("status", ["Pendente", "Fazendo", "Concluído"]).defaultTo("Pendente");
    
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("conclusion_at").nullable();
    table.timestamp("due_date").nullable();

    table.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

  const oldTasks = await knex.select("*").from("_tasks_old");
  if (oldTasks.length > 0) {
    const newTasks = oldTasks.map(task => {
      let newStatus = 'Pendente'; // Padrão
      if(task.status === 'em andamento') newStatus = 'Fazendo';
      if(task.status === 'concluída') newStatus = 'Concluído';
      return { ...task, status: newStatus };
    });
    await knex.insert(newTasks).into("tasks");
  }

  await knex.schema.dropTable("_tasks_old");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tasks");
}