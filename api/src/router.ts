import { Router } from 'express'
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
router.post('/users', user.create)

export default router