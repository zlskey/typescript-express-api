import User from '../models/User.model'
import bcrypt from 'bcrypt'

export const authorizeUser = async (
    username: string,
    password: string
): Promise<void> => {
    const user = await User.findOne({ username })

    if (user) {
        const isValid = await bcrypt.compare(password, user.password)

        if (isValid) return

        throw Error('incorrect password')
    }

    throw Error('incorrect username')
}
