'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Compra extends Model {
    static get table () {
        return 'compras'
      }

      static get primaryKey () {
        return 'id'
      }
}

module.exports = Compra
