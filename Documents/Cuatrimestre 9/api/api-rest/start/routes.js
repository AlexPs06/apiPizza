'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' } 
})

Route.group(() => {
  Route.post('pizzas', 'PizzaController.store')
  Route.get('pizzas', 'PizzaController.index')
  Route.get('pizzas/:id', 'PizzaController.show')
  Route.put('pizzas/:id', 'PizzaController.update')
  Route.delete('pizzas/:id', 'PizzaController.delete')


  Route.post('compras', 'CompraController.store')
  Route.get('compras', 'CompraController.index')
  Route.get('compras/:id', 'CompraController.show')
  Route.put('compras/:id', 'CompraController.update')
  Route.delete('compras/:id', 'CompraController.delete')

}).prefix('api/v1')
