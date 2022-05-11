import jwt from 'jsonwebtoken'

export const generateToken = (_id, username) => {
    const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    return token;
}

export const verifyToken = (token) => {
    const { _id, username } = jwt.verify(token, process.env.JWT_SECRET)

    return { _id, username };
}
