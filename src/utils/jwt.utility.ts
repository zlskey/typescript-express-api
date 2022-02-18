import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const JWT_SECRET = process.env.PORT

if (!JWT_SECRET) throw Error('JWT_SECRET is not defined')

export const createToken = (_id: mongoose.Types.ObjectId, expiresIn: number) =>
    jwt.sign({ _id }, JWT_SECRET, { expiresIn })

export const validateToken = (token: string) => {
    try {
        const encryptedToken = jwt.verify(token, JWT_SECRET)

        return encryptedToken
    } catch (err) {
        throw Error('Login to do that')
    }
}
