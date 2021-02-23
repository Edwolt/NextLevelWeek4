import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User'

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body

        const repository = getRepository(User)

        const exists = await repository.findOne({ email }) // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        if (exists) return res.status(400).json({ error: 'User already exists!' })

        const user = repository.create({ name, email })

        await repository.save(user)
        return res.json(user)
    }
}

export default UserController