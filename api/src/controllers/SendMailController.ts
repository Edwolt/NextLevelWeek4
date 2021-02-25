import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveysRepository from '../repositories/SurveysRepository';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

export default class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userExists = await usersRepository.findOne({ email })
        if (!userExists) return res.status(400).json({ error: "User doesn't exist!" })

        const surveyExists = await surveysRepository.findOne({ id: survey_id })
        if (!surveyExists) return res.status(400).json({ erro: "Survey doesn't exists!" })

        // Salvar as informações na tabela
        const surveyUser = surveysUsersRepository.create({ survey_id, user_id: userExists.id })
        await surveysUsersRepository.save(surveyUser)

        // Enviar email para o usuário

        return res.status(201).json(surveyUser)
    }
}