import _ from 'lodash'
import User, { IUser } from '../models/User.model'

export const create = async (
    username: string,
    password: string
): Promise<Omit<IUser, 'password'>> => {
    try {
        if (!username || !password) throw Error('Missing args')

        const user = await User.create({ username, password })

        return _.omit(user.toObject(), 'password')
    } catch (err: any) {
        if (err?.code === 11000) {
            throw Error('Username is already taken')
        }

        throw err
    }
}

export const get = async (
    username: IUser['username']
): Promise<Omit<IUser, 'password'>> => {
    const user = await User.findOne({ username })

    if (!user) throw Error('User does not exist')

    return _.omit(user.toObject(), 'password')
}

export const remove = async (username: IUser['username']): Promise<void> => {
    await User.findOneAndDelete({ username })
}
