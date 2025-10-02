import Joi from 'joi'
import { messages } from 'joi-translation-pt-br'

const productSchema = Joi.object()
  .keys({
    id: Joi.forbidden(),
    name: Joi.string().min(3).max(50).empty("").required().label('Nome'),
    price: Joi.number().min(0).precision(2).empty("").required().label('Preço'),
    stock: Joi.number().min(0).integer().empty("").required().label('Estoque'),
    description: Joi.string().empty("").required().label('Descrição'),
    createdAt: Joi.forbidden(),
    updatedAt: Joi.forbidden(),
  })
  .messages(messages)

export default productSchema
