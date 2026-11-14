import { Knex } from 'knex' // AI Refactor Patch: Changed import from "import * as knex" to named type import "{ Knex }" because knex 0.19.5 -> 2.4.0 switched to a default export with the 'Knex' interface for typings; using the namespace import breaks TypeScript typing and migration signatures in 2.x.

export function up(db: Knex) { // AI Refactor Patch: Updated parameter type from 'knex' namespace to 'Knex' interface because knex 0.19.5 -> 2.4.0 requires using the 'Knex' type; the old 'import * as knex' pattern no longer works with 2.x typings.
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

export function down(db: Knex) { // AI Refactor Patch: Updated parameter type from 'knex' namespace to 'Knex' interface to align with knex 0.19.5 -> 2.4.0 typing changes; ensures migrations type-check and run correctly under 2.x.
  return db.schema.dropTable('task').dropTable('user')
}
