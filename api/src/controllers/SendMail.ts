import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import SendMailService from '../services/SendMailService'
import { resolve } from 'path'
import AppError from '../error/AppError'

import Survey from '../models/Survey'
import SurveyUser from '../models/SurveyUser'
import User from '../models/User'

export default class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body

        const usersRepository = getRepository(User)
        const surveysRepository = getRepository(Survey)
        const surveysUsersRepository = getRepository(SurveyUser)

        const user = await usersRepository.findOne({ email })
        if (!user) throw new AppError("User doesn't exist!")

        const survey = await surveysRepository.findOne({ id: survey_id })
        if (!survey) throw new AppError("Survey doesn't exists!")

        const templatePath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: '',
            link: process.env.URL_MAIL
        }

        // Verifica se o usuário já respondeu a pesquisa
        let surveyUser = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ['user', 'survey']
        })


        let status = 500
        if (surveyUser) {
            variables.id = surveyUser.id
            await SendMailService.execute(email, survey.title, variables, templatePath)
            status = 200
        } else {
            surveyUser = surveysUsersRepository.create({ survey_id, user_id: user.id })
            variables.id = surveyUser.id
            await surveysUsersRepository.save(surveyUser)// Salvar as informações na tabela
            status = 201
        }

        // Enviar email para o usuário
        await SendMailService.execute(email, survey.title, variables, templatePath)

        return res.status(status).json(surveyUser)
    }
}