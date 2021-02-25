import { Router } from 'express'
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

router.post('/users', user.create)

router.post('/surveys', survery.create)
router.get('/surveys', survery.show)

export default router