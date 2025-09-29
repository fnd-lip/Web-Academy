import { Schema } from 'joi'
function validator<T>(schema: Schema, data: T) {
  const objErros: Record<string, string> = {}
  const { error } = schema.validate(data, { abortEarly: false })
  if (error) {
    error.details.forEach((e) => {
      objErros[e.path.join('.')] = e.message.replaceAll('"', "")
    })
  }
  return objErros
}
export default validator
