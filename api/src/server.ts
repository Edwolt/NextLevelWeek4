import 'reflect-metadata'
import './database'
import express from 'express'

const app = express();

/* Rotas
- GET: Buscar
- POST: Salvar
- PUT: Alterar
- DELETE: Deletar
- PATCH: Alteração específica
- etc.
*/

app.get('/', (req, res) => res.send('Hellor World - NLW04'))
app.post('/', (req, res) => res.send('Os dados foram salvos com sucesso'))

app.listen(3333, () => console.log('Server is running"'))