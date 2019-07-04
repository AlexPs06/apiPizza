'use strict'
const Pizza = use("App/Models/Pizza")

class PizzaController {
    async index ({response}) {
        let pizzas = await Pizza.all()

        return response.json(pizzas)
      }
    async store ({request, response}) {
        const pizzaInfo = request.only(['nombre', 'ingredientes', 'imagen', 'descripcion','precio'])
        const pizza = new Pizza()
        pizza.nombre = pizzaInfo.nombre
        pizza.ingredientes = pizzaInfo.ingredientes
        pizza.imagen = pizzaInfo.imagen
        pizza.descripcion = pizzaInfo.descripcion
        pizza.precio = pizzaInfo.precio
        await pizza.save()
        return response.status(201).json(pizza)
    }
    async show ({params, response}) {
        const pizza = await Pizza.find(params.id)
        return response.json(pizza)
    }
    async update ({params, request, response}) {
        const pizzaInfo = request.only(['nombre', 'ingredientes', 'imagen', 'descripcion','precio'])

        const pizza = await Pizza.find(params.id)
        if (!pizza) {
          return response.status(404).json({data: 'Resource not found'})
        }
        pizza.nombre = pizzaInfo.nombre
        pizza.ingredientes = pizzaInfo.ingredientes
        pizza.imagen = pizzaInfo.imagen
        pizza.descripcion = pizzaInfo.descripcion
        pizza.precio = pizzaInfo.precio
        await pizza.save()
        return response.status(201).json(pizza)
      }

    async delete ({params, response}) {
        const pizza = await Pizza.find(params.id)
        if (!pizza) {
          return response.status(404).json({data: 'Resource not found'})
        }
        await pizza.delete()

        return response.status(204).json(null)
    }
 

}

module.exports = PizzaController
