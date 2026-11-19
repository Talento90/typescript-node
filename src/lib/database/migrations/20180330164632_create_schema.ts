import { Knex } from 'knex' // AI Refactor Patch: Changed import from "import * as knex" to "import { Knex }" because knex 0.19.5 -> 2.4.0 updated TypeScript types; the module no longer matches a namespace import, and the recommended type import is the named Knex type.

export function up(db: Knex) { // AI Refactor Patch: Updated parameter type from "knex" to "Knex" to align with knex 0.19.5 -> 2.4.0 TypeScript changes; functions should accept Knex-typed instances.
  return db.schema
    .createTable('user', table => {
      table.increments('id').primary()
      table.string('email', 64).unique()
      table.string('password', 256).notNullable()
      table.enum('role', ['user', 'admin']).notNullable()
      table.string('first_name', 64).notNullable()
      table.string('last_name', 64).notNullable()
      table.dateTime('created').notNullable()
      table.dateTime('updated').notNullable()
    })
    .then(() => {
      return db.schema.createTable('task', table => {
        table.increments('id').primary()
        table.string('name', 64).notNullable()
        table.string('description').notNullable()
        table.boolean('done').notNullable()
        table.dateTime('created').notNullable()
        table.dateTime('updated').notNullable()
        table
          .integer('user_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('user')
      })
    })
}

export function down(db: Knex) { // AI Refactor Patch: Updated parameter type from "knex" to "Knex" per knex 0.19.5 -> 2.4.0 TypeScript type export changes to ensure correct typings in migrations.
  return db.schema.dropTable('task').dropTable('user')
}
