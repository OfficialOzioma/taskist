import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'


export default class AuthController {

  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async authenticate({ request, response, auth, session }: HttpContextContract) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);

      return response.redirect('/task')
    } catch (error) {
      session.flash('notification', 'Incorrect credentials, try again')

      return response.redirect('back')
    }
  }

  public async register({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async create({ request, response, auth }: HttpContextContract) {

    const validationSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.minLength(3)
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' })
      ]),
      password: schema.string({ trim: true }, [
        rules.confirmed()
      ])
    })

    const payload = await request.validate({
      schema: validationSchema
    })

    const user = await User.create(payload)
    await auth.login(user);

    return response.redirect('/task');
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/login')
  }

}
