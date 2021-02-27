import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";

export default class AnswerController {
    /*
    Route Params: Parâmetros que compõe a rota
    route.get('answers/:value')  
    link/answer/5 => value = 5

    Query Params: Parâmetros não obrigatórios na URL
    link/answer?chave=valor => chave=valor
    */

    async execute(req: Request, res: Response) {
        const value = req.params.value
        const u = req.query.u

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({ id: String(u) })

        if (!surveyUser) return res.status(400).json({ error: "Survey User doesn't exists!" })

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)
        return res.json(surveyUser)
    }
}