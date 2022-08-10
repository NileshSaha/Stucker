import { ApplicationContract } from '@ioc:Adonis/Core/Application'

interface Payload {
  message: string
  data?: object
}

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const { DatabaseQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')

    DatabaseQueryBuilder.macro('getCount', async function () {
      const result = await this.count('* as total')
      return BigInt(result[0].total)
    })

    const Response = this.app.container.use('Adonis/Core/Response')

    Response.macro('success', function (message: string, status: number = 400, data: object = []) {
      const payload: Payload = {
        message,
      }
      if (Object.keys(data).length > 0) payload.data = data
      this.ctx!.response.status(status).json(payload)
      return this
    })

    Response.macro('error', function (message: string, status: number = 400, data: object = []) {
      const payload: Payload = {
        message,
      }
      if (Object.keys(data).length > 0) payload.data = data
      this.ctx!.response.status(status).json(payload)
      return this
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
