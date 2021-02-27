import { Router } from 'express'
import AnswerController from './controllers/AnswerController'
import SendMailController from './controllers/SendMailController'
import SurveysController from './controllers/SurveysController'
import UserController from './controllers/UserController'

const router = Router()

/* Rotas
- GET: Buscar
- POST: Salvar
- PUT: Alterar
- DELETE: Deletar
- PATCH: Alteração específica
- etc.
*/

const user = new UserController()
const survery = new SurveysController()
const sendMail = new SendMailController()
const answer = new AnswerController

router.post('/users', user.create)

router.post('/surveys', survery.create)
router.get('/surveys', survery.show)

router.post('/sendMail', sendMail.execute)

router.get('/answers/:value', answer.execute)

export default router