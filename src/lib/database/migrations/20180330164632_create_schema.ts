import * as knex from 'knex'

export function up(db: knex) {
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

export function down(db: knex) {
  return db.schema.dropTable('task').dropTable('user')
}
