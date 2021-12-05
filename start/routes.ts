/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
}).middleware('guest')

// Route.get('/', async ({ view }) => {
//   return view.render('task.index')
// })


Route.group(() => {
  Route.resource('/task', 'TasksController').as('tasks');

  Route.post('logout', 'AuthController.logout').as('logout')
}).middleware('auth')


Route.group(() => {
  Route.get('register', 'AuthController.register').as('showRegister')
  Route.post('register', 'AuthController.create').as('register')

  Route.get('login', 'AuthController.login').as('showLogin');
  Route.post('login', 'AuthController.authenticate').as('login')

}).middleware('guest')

