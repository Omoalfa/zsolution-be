import Joi from 'joi'

export const PostCarValidation = (req, res, next) => {
    const postSchema = new Joi.object({
        name: Joi.string().required(),
        type: Joi.string().valid('new', 'used').required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        description: Joi.string().optional(),
        price: Joi.number().min(2).required()
    })

    const { error } = postSchema.validate(req.body);

    if (error) res.status(400).json({ message: 'invalid input', success: false, error })

    return next()
}

