import joi from "joi"

export const prodValid = (req, res, next) => {
  const Schema = joi.object({
    name: joi.string().required().min(3).max(20),
    price: joi.number().min(1).required(),
    quantity: joi.number().min(1).required(),
  })
  const { err } = Schema.validate(req.body, { abortEarly: false })
  if (err) {
    return res.status(400).json({
      message: err,
    })
  }
  next()
}
