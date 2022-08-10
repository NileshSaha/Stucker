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
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  //AuthController
  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
  }).prefix('/auth')

  //PostController
  Route.group(() => {
    Route.get('/list', 'PostsController.index')
    Route.post('/create', 'PostsController.index')
    Route.get('/show/:id', 'PostsController.show').where('id', {
      match: /^[0-9]+$/,
      cast: (id) => Number(id),
    })
  }).prefix('/post')
}).prefix('/api')
