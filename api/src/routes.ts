import { Router } from 'express'
import Answer from './controllers/Answer'
import Nps from './controllers/Nps'
import SendMail from './controllers/SendMail'
import Surveys from './controllers/Surveys'
import User from './controllers/User'

const router = Router()

/* Rotas
- GET: Buscar
- POST: Salvar
- PUT: Alterar
- DELETE: Deletar
- PATCH: Alteração específica
- etc.
*/

const user = new User()
const survery = new Surveys()
const sendMail = new SendMail()
const answer = new Answer()
const nps= new Nps()

router.post('/users', user.create)

router.post('/surveys', survery.create)
router.get('/surveys', survery.show)

router.post('/sendMail', sendMail.execute)

router.get('/answers/:value', answer.execute)

router.get('/nps/:survey_id', nps.execute)

export default router