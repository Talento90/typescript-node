// import * as knex from 'knex'

// export function up(knex) {
//   return knex.schema.createTable('user_mappings', table => {
//     table.increments()
//     table
//       .integer('pd_user_id', 11)
//       .notNullable()
//       .unsigned()
//     table.string('system_id', 50).notNullable()
//     table.string('ext_ref', 50).notNullable()
//     table.unique(['system_id', 'pd_user_id'], 'no_duplicate_marketplace_users')
//     table.unique(['system_id', 'ext_ref'], 'no_duplicate_marketplace_refrences')
//   })
// }

// export function down(knex) {
//   return knex.schema.dropTable('user_mappings')
// }
