export default class PostsController {
  public async index({ request, response }) {
    const data = [
      {
        id: 1,
        title: 'Hello world',
        request,
      },
      {
        id: 2,
        title: 'Hello universe',
      },
    ]
    return response.success('User created', 200, data)
  }
}
