import joi from "joi"

export const userValid = (req, res, next) => {
  const Schema = joi.object({
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().required(),
  })
  const { err } = Schema.validate(req.body, { abortEarly: false })
  if (err) {
    return res.status(400).json({
      message: err,
    })
  }
  next()
}
