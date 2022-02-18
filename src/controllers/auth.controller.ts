import { RequestHandler } from 'express'

import { authService, userService } from '../services'
import { jwtUtils } from '../utils'

const maxAge = 3 * 24 * 60 * 60 * 1000
const cookieOptions = { httpOnly: true, secure: true, maxAge }

export const signup: RequestHandler = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const user = await userService.create(username, password)

        const token = jwtUtils.createToken(user._id, maxAge / 1000)

        res.cookie('jwt', token, cookieOptions).json(user)
    } catch (err) {
        next(err)
    }
}

export const login: RequestHandler = async (req, res, next) => {
    try {
        const { username, password } = req.body

        await authService.authorizeUser(username, password)

        const user = await userService.get(username)

        const token = jwtUtils.createToken(user._id, maxAge / 1000)

        res.cookie('jwt', token, cookieOptions).json(user)
    } catch (err) {
        next(err)
    }
}

export const logout: RequestHandler = async (req, res, next) => {
    res.clearCookie('jwt').status(200).end()
}
