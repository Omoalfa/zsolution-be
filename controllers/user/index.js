import { generateToken } from "../../helpers/jwt";
import User from "../../models/User";

export const createUser = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const user = new User({
            name, username, password
        });

        await user.save()

        return res.status(201).json({
            message: 'User account created successfully',
            data: user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            success: false
        })
    }
}

export const LoginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        const token = generateToken(user._id, username);

        return res.status(200).json({
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            success: false
        })
    }
}

