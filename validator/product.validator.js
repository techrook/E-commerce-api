const Joi = require('joi');

const productValidatorMiddleware = async (req, res , next) => {
    const productPayload = req.body
    try {
        await productValidator.validateAsync(productPayload)
        next()
    } catch (error) {
        return res.status(406).send(error.details[0].message)
    }
}

const productValidator = Joi.object({
    name :Joi.string()
        .min(3)
        .max(255)
        .required(),
    category : Joi.object()
        .required(),
    description : Joi.string()
        .min(5)
        .max(255)
        .required(),
    price : Joi.number()
        .greater(0)
        .required(),
    quantity : Joi.number()
        .greater(12)
        .max(25)
})

module.exports = productValidatorMiddleware