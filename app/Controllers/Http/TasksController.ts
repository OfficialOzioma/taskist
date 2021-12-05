import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ view, auth }: HttpContextContract) {
    const user = auth.user
    await user?.load('tasks')

    return await view.render('task.index', { tasks: user?.tasks })
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response, session, auth }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.minLength(3)
      ])
    })

    const payload = await request.validate({
      schema: validationSchema,
      messages: {
        'title.required': 'Task is required',
        'title.minLength': 'Task can not be less than 3 characters',

      }
    })

    await auth.user?.related('tasks').create({
      title: payload.title,
    });

    session.flash('notification', 'Task created successfully !')

    return response.redirect('back')
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ request, response, session, params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    task.is_completed = !!request.input('completed')
    await task.save()

    session.flash('notification', 'Task updated !')

    return response.redirect('back')

  }

  public async destroy({ response, session, params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    await task.delete();

    session.flash('notification', 'Task Deleted !')

    return response.redirect('back')
  }
}
