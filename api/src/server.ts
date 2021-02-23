import 'reflect-metadata'
import express from 'express'
import './database/index.js'

const app = express()

/* Rotas
- GET: Buscar
- POST: Salvar
- PUT: Alterar
- DELETE: Deletar
- PATCH: Alteração específica
*/

app.get('/', (req, res) => res.send('Hello World - NLW04'))
app.post('/', (req, res) => res.send('Os dados forma salvos com sucesso'))

app.listen(3333, () => console.log('Server is running!'))