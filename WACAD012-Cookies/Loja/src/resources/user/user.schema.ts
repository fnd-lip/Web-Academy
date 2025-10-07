import Joi from 'joi'
import { messages } from 'joi-translation-pt-br'
import { UserTypes } from '../userType/userType.constants'

export const userSchema = Joi.object()
  .keys({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    repeatPassword: Joi.string().valid(Joi.ref('password')).required(),
    typeId: Joi.number().valid(UserTypes.client, UserTypes.admin).required(),
  })
  .messages(messages)
