import { RequestHandler } from 'express'

import { jwtUtils } from '../utils'

import mongoose from 'mongoose'

declare global {
    namespace Express {
        interface Request {
            userId?: mongoose.Types.ObjectId
        }
    }
}

const authorizeCookie: RequestHandler = (req, res, next) => {
    try {
        const jwt = req.cookies.jwt

        const token = jwtUtils.validateToken(jwt)

        if (typeof token !== 'string') req.userId = token._id

        next()
    } catch (err: any) {
        if (err?.message === 'Login to do that') res.status(401)

        next(err)
    }
}

export default authorizeCookie
