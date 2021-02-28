import { Request, Response, Router } from 'express'
import * as yup from 'yup'
import { getRepository, IsNull, Not, Repository } from "typeorm";
import SendMail from './controllers/SendMail'
import AppError from './error/AppError'
import Survey from './models/Survey'
import User from './models/User';
import SurveyUser from './models/SurveyUser';

const router = Router()

/* Rotas
- GET: Buscar
- POST: Salvar
- PUT: Alterar
- DELETE: Deletar
- PATCH: Alteração específica
- etc.
*/

let repos: any = null
const getRepos = () => ({
    user: getRepository(User),
    survey: getRepository(Survey),
    surveyUser: getRepository(SurveyUser)
})


// Create User
router.post('/users', async (req: Request, res: Response) => {
    repos = repos ?? getRepos()
    const schema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório'),
        email: yup.string().email('Email Incorreto').required('Email é obrigatório')
    })

    try {
        await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
        throw new AppError(err)
    }

    const { name, email } = req.body

    const exists = await repos.user.findOne({ email }) // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    if (exists) throw new AppError('User already exists!')

    const user = repos.user.create({ name, email })

    await repos.user.save(user)
    return res.status(201).json(user)
})

// Create Survey
router.post('/surveys', async (req: Request, res: Response) => {
    repos = repos ?? getRepos()
    const { title, description } = req.body

    const survey = repos.survey.create({ title, description })

    await repos.survey.save(survey)
    return res.status(201).json(survey)
})

router.get('/surveys', async (req: Request, res: Response) => {
    repos = repos ?? getRepos()
    const all = await repos.survey.find()
    return res.json(all)
})

// Send E-mail and create a Survey User if it does'nt exists yet
const sendMail = new SendMail()
router.post('/sendMail', sendMail.execute)

// Receive Answer from user
router.get('/answers/:value', async (req: Request, res: Response) => {
    /*
    Route Params: Parâmetros que compõe a rota
    route.get('answers/:value')  
    link/answer/5 => value = 5
    
    Query Params: Parâmetros não obrigatórios na URL
    link/answer?chave=valor => chave=valor
    */
    repos = repos ?? getRepos()

    const value = req.params.value
    const u = req.query.u

    const surveyUser = await repos.surveyUser.findOne({ id: String(u) })

    if (!surveyUser) throw new AppError("Survey User doesn't exists!")

    surveyUser.value = Number(value)

    await repos.surveyUser.save(surveyUser)
    return res.json(surveyUser)
})

// Calculate NPS
router.get('/nps/:survey_id', async (req: Request, res: Response) => {
    /*
    Notas são de 1 a 10
    Detratores são de 0 a 6
    Passivos são de 7 a 8
    Promotores são de 9 a 10

    NPS = (promotore - detratores) / respondentes
    (Como é porcentagem tem que multiplicar o NPS por 100)
    */
    repos = repos ?? getRepos()

    const survey_id = req.params.survey_id

    const surveysUsersRepository = getRepository(SurveyUser)

    const surveysUsers = await surveysUsersRepository.find({ survey_id, value: Not(IsNull()) })

    const detractors = surveysUsers.filter(survey => survey.value >= 0 && survey.value <= 6).length
    const promoters = surveysUsers.filter(survey => 9 && survey.value <= 10).length
    const passives = surveysUsers.filter(survey => survey.value >= 7 && survey.value <= 8).length
    const totalAnswers = surveysUsers.length
    const calculate = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2))

    return res.json({ detractors, promoters, passives, totalAnswers, nps: calculate })
})

export default router