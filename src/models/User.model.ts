import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
    _id: mongoose.Types.ObjectId
    username: string
    password: string
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'short password'],
        maxLength: [32, 'long password'],
    },
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

const User = mongoose.model<IUser>('Users', userSchema)

export default User
