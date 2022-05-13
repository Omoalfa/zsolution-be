import Joi from 'joi';
import User from '../models/User';
import bcrypt from 'bcrypt'

export const createUserValidation = async (req, res, next) => {
    const userSchema = new Joi.object({
        name: Joi.string().min(2).required(),
        username: Joi.string().min(3).required(),
        password: Joi.string().min(8).required()
    })

    const { error } = userSchema.validate(req.body);

    if (error) return res.status(400).json({
        message: 'Validation error',
        error,
        success: false
    })

    const user = await User.findOne({ username: req.body.username });

    if (user) return res.status(400).json({
        message: 'Validation error',
        error: 'username already exist',
        success: false
    })

    req.body = {
        ...req.body, password: bcrypt.hashSync(req.body.password, 10)
    }

    return next()
}

export const userLoginValidation = async (req, res, next) => {
    const userSchema = new Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(8).required()
    })

    const { error } = userSchema.validate(req.body);

    if (error) return res.status(400).json({
        message: 'Validation error',
        error,
        success: false
    })

    const user = await User.findOne({ username: req.body.username }).select('password');

    if (!user) return res.status(400).json({
        message: 'Invalid credential',
        success: false
    })

    const match = bcrypt.compareSync(req.body.password, user.password)

    if (!match) return res.status(400).json({
        message: 'Invalid credential',
        success: false
    })
    
    return next()
}
