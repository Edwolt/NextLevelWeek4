import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Survey from '../models/Survey'

export default class SurverysController {
    async create(req: Request, res: Response) {
        const { title, description } = req.body

        const repository = getRepository(Survey)
        
        const survey = repository.create({ title, description })
        
        await repository.save(survey)
        return res.status(201).json(survey)
    }
    
    async show(req:Request, res:Response){
        const repository = getRepository(Survey)
        const all = await repository.find()
        return res.json(all)
    }
}