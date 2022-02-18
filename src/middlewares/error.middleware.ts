import { ErrorRequestHandler, RequestHandler } from 'express'

export const notFound: RequestHandler = (req, res, next) => {
    res.status(404)

    const error = new Error(`Invalid URL - ${req.originalUrl}`)
    next(error)
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500

    res.status(statusCode).json({
        error: {
            code: err.code,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? '⛷️' : err.stack,
        },
    })
}
