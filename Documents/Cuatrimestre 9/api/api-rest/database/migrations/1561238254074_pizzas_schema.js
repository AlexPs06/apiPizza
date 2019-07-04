'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PizzasSchema extends Schema {
  up () {
    this.create('pizzas', (table) => {
      table.increments()
      table.timestamps()
      table.string('nombre')
      table.string('ingredientes')
      table.string('imagen')
      table.string('descripcion')
      table.string('precio')
    })
  }

  down () {
    this.drop('pizzas')
  }
}

module.exports = PizzasSchema
