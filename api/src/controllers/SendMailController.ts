import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveysRepository from '../repositories/SurveysRepository';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';
import UsersRepository from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

export default class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const user = await usersRepository.findOne({ email })
        if (!user) return res.status(400).json({ error: "User doesn't exist!" })

        const survey = await surveysRepository.findOne({ id: survey_id })
        if (!survey) return res.status(400).json({ erro: "Survey doesn't exists!" })

        // Salvar as informações na tabela
        const surveyUser = surveysUsersRepository.create({ survey_id, user_id: user.id })
        await surveysUsersRepository.save(surveyUser)

        // Enviar email para o usuário
        await SendMailService.execute(email, survey.title, survey.description)

        return res.status(201).json(surveyUser)
    }
}