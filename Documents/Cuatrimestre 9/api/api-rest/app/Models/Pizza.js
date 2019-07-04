'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pizza extends Model {
    static get table () {
        return 'pizzas'
      }

      static get primaryKey () {
        return 'id'
      }
}

module.exports = Pizza
