// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegistrationValidator from 'App/Validators/Auth/RegistrationValidator'
export default class AuthController {
  public async login({ auth, request, response }) {
    const { email, password } = await request.validate(LoginValidator)

    // Lookup user manually
    const user = await User.query().where('email', email).firstOrFail()

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    // Generate token
    const token = await auth.use('api').generate(user)
    return response.success('Login successful', 200, { token, user })
  }

  public async register({ request, response }) {
    const payload = await request.validate(RegistrationValidator)
    const user = await User.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    })
    return response.success('Registered successfully', 201, { user })
  }
}
