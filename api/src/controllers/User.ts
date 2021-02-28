import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User'
import * as yup from 'yup'
import AppError from '../error/AppErros'

export default class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email('Email Incorreto').required('Email é obrigatório')
        })

        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (err) {
            throw new AppError(err)
        }

        const repository = getRepository(User)

        const exists = await repository.findOne({ email }) // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        if (exists) throw new AppError('User already exists!')

        const user = repository.create({ name, email })

        await repository.save(user)
        return res.status(201).json(user)
    }
}