// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    // Lookup user manually
    const user = await User.query()
      .where('email', email)
      // .where('tenant_id', getTenantIdFromSomewhere)
      // .whereNull('is_deleted')
      .firstOrFail()

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    // Generate token
    const token = await auth.use('api').generate(user)
    // return response.success('Login successful', 200, { token })
  }

  // public async register({ request, response }) {
  //   const user = await User.create({
  //     email: request.input('email'),
  //     password: request.input('password'),
  //   })
  //   return response.success('Registered successfully', 201, { user })
  // }
}
