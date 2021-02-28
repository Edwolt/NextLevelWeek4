import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsers";

export default class NpsController {
    async execute(req: Request, res: Response) {
        /*
        Notas são de 1 a 10
        Detratores são de 0 a 6
        Passivos são de 7 a 8
        Promotores são de 9 a 10

        NPS = (promotore - detratores) / respondentes
        (Como é porcentagem tem que multiplicar o NPS por 100)
        */

        const survey_id = req.params.survey_id

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveysUsers = await surveysUsersRepository.find({ survey_id, value: Not(IsNull()) })

        const detractors = surveysUsers.filter(survey => survey.value >= 0 && survey.value <= 6).length
        const promoters = surveysUsers.filter(survey => 9 && survey.value <= 10).length
        const passives = surveysUsers.filter(survey => survey.value >= 7 && survey.value <= 8).length
        const totalAnswers = surveysUsers.length
        const calculate = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2))

        return res.json({ detractors, promoters, passives, totalAnswers, nps: calculate })
    }
}