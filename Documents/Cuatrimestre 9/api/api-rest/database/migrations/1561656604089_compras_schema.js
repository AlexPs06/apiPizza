'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComprasSchema extends Schema {
    up() {
        this.create('compras', (table) => {
            table.increments()
            table.timestamps()
            table.string('token')
            table.string('lista')
            table.string('direccion')
            table.string('referencias')
            table.string('telefono')
            table.string('nombre')
            table.string('correo')
            table.string('estatus')
            table.string('tokenNotificaciones')
        })
    }

    down() {
        this.drop('compras')
    }
}

module.exports = ComprasSchema