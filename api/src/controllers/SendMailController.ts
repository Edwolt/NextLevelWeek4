import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import SurveysRepository from '../repositories/SurveysRepository'
import SurveysUsersRepository from '../repositories/SurveysUsersRepository'
import UsersRepository from '../repositories/UsersRepository'
import SendMailService from '../services/SendMailService'
import { resolve } from 'path'
import AppError from '../error/AppErros'

export default class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const user = await usersRepository.findOne({ email })
        if (!user) throw new AppError("User doesn't exist!")

        const survey = await surveysRepository.findOne({ id: survey_id })
        if (!survey) throw new AppError("Survey doesn't exists!")

        const templatePath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

        // Verifica se o usuário já respondeu a pesquisa
        const surveyUserExists = await surveysUsersRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ['user', 'survey']
        })

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: '',
            link: process.env.URL_MAIL
        }

        if (surveyUserExists) {
            variables.id = surveyUserExists.id
            await SendMailService.execute(email, survey.title, variables, templatePath)
            return res.json(surveyUserExists)
        }

        // Salvar as informações na tabela
        const surveyUser = surveysUsersRepository.create({ survey_id, user_id: user.id })
        await surveysUsersRepository.save(surveyUser)

        // Enviar email para o usuário
        variables.id = surveyUser.id
        await SendMailService.execute(email, survey.title, variables, templatePath)

        return res.status(201).json(surveyUser)
    }
}