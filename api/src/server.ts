// Obs: no ormconfig pode adicionar a funcionalidade logging:true para mostrar exatamente quais são as requisições ao banco de dados

import 'reflect-metadata'
import express from 'express'
import './database'
import router from './router'

const app = express();

app.use(express.json())
app.use(router)

app.listen(3333, () => console.log('Server is running!'))