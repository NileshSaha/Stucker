// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import RegistrationRequestValidator from 'App/Validators/Auth/RegistrationRequestValidator'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AuthController {
  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    // Lookup user manually
    const user = await User.query().where('email', email).firstOrFail()

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    // Generate token
    const token = await auth.use('api').generate(user)
    return response.success('Login successful', 200, { token })
  }

  public async register({ request, response }) {
    const payload = await request.validate(RegistrationRequestValidator)
    Logger.info('payload', payload)
    const user = await User.create({
      name: request.input('name'),
      email: request.input('email'),
      password: request.input('password'),
    })
    return response.success('Registered successfully', 201, { user })
  }
}
