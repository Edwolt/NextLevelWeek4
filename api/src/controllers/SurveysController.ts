import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import SurveysRepository from '../repositories/SurveysRepository'

export default class SurverysController {
    async create(req: Request, res: Response) {
        const { title, description } = req.body

        const repository = getCustomRepository(SurveysRepository)

        const survey = repository.create({ title, description })

        await repository.save(survey)
        return res.status(201).json(survey)
    }
}