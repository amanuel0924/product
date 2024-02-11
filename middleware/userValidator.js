import joi from "joi"

export const userValid = (req, res, next) => {
  const Schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi
      .string()
      .min(8)
      .max(30)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
      )
      .required(),
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
