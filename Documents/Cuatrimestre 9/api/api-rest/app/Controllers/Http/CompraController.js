'use strict'
const Compra = use("App/Models/Compra")
const stripe = require('stripe')('sk_test_WPxp1ZDJ23xC0gywfy6S3fgZ00421Q9xmz');

class CompraController {
    async index({ response }) {
        let compras = await Compra.all()

        return response.json(compras)
    }
    async store({ request, response }) {
        // const compraInfo = request.only(['token', 'lista', 'direccion', 'referencias','telefono', 'nombre','correo'])
        // const compra = new Compra()
        // compra.token = compraInfo.token
        // compra.lista = compraInfo.lista
        // compra.direccion = compraInfo.direccion
        // compra.referencias = compraInfo.referencias
        // compra.telefono = compraInfo.telefono
        // compra.nombre = compraInfo.nombre
        // compra.correo = compraInfo.correo
        const compra = new Compra()
        compra.token = request.body.token
        compra.lista = request.body.lista
        compra.direccion = request.body.direccion
        compra.referencias = request.body.referencias
        compra.telefono = request.body.telefono
        compra.nombre = request.body.nombre
        compra.correo = request.body.correo
        compra.estatus = request.body.estatus
        compra.tokenNotificaciones = request.body.tokenNotificaciones

        let carrito = JSON.parse(request.body.lista)
        let total = 0.0
        carrito.forEach(element => {
            total = parseFloat(element.precio) + total
            console.log(element.precio)
        });

        const token = request.body.token;
        try {
            (async() => {
                const charge = await stripe.charges.create({
                    amount: total * 100,
                    currency: 'mxn',
                    description: "Compra pizza",
                    source: token,
                });
            })();
        } catch (error) {
            console.error(error)
        }

        await compra.save()
        return response.status(201).json(compra)
    }
    async show({ params, response }) {
        const compra = await Compra.find(params.id)
        return response.json(compra)
    }
    async update({ params, request, response }) {
        const compraInfo = request.only(['token', 'lista', 'direccion', 'referencias', 'telefono', 'nombre', 'correo', 'estatus'])

        const compra = await Compra.find(params.id)
        if (!compra) {
            return response.status(404).json({ data: 'Resource not found' })
        }

        compra.token = compraInfo.token
        compra.lista = compraInfo.lista
        compra.direccion = compraInfo.direccion
        compra.referencias = compraInfo.referencias
        compra.telefono = compraInfo.telefono
        compra.nombre = compraInfo.nombre
        compra.correo = compraInfo.correo
        compra.estatus = compraInfo.estatus


        await compra.save()
        return response.status(201).json(compra)
    }

    async delete({ params, response }) {
        const compra = await Compra.find(params.id)
        if (!compra) {
            return response.status(404).json({ data: 'Resource not found' })
        }
        await compra.delete()

        return response.status(204).json(null)
    }

}

module.exports = CompraController