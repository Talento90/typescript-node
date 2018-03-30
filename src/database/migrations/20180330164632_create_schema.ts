import * as knex from 'knex'

export function up(db: knex) {
  return db.schema
    .createTable('user', table => {
      table.increments('id').primary()
      table.string('email', 50).notNullable()
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.dateTime('created').notNullable()
      table.dateTime('updated').notNullable()
    })
    .then(() => {
      return db.schema.createTable('task', table => {
        table.increments('id').primary()
        table.string('name', 50).notNullable()
        table.string('description').notNullable()
        table.boolean('done').notNullable()
        table.dateTime('created').notNullable()
        table.dateTime('updated').notNullable()
        table
          .integer('user_id')
          .unsigned()
          .references('id')
          .inTable('user')
      })
    })
}

export function down(db: knex) {
  return db.schema.dropTable('task').dropTable('user')
}
