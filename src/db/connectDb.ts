import mongoose from 'mongoose'

const dbURI = process.env.MONGODB_URL

if (!dbURI) throw Error('MONGODB_URI is not defined')

mongoose
    .connect(dbURI)
    .then(() => console.log('db connected'))
    .catch(err => console.log(err))
