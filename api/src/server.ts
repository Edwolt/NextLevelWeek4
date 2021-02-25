// Obs: no ormconfig pode adicionar a funcionalidade logging:true para mostrar exatamente quais são as requisições ao banco de dados

/*
Testes Automatizados

Desenvolvimento orientado a teste (TDD)
A partir dos testes começa a desenvolver o projeto

Tipos de testes
- Testes unitários
Não tem acesso a banco de dados e a apis externas

- Testes de integração
Testa todo o fluxo do programa
request -> routes -> controller -> repository -|
        response <- controller <- repository <-|

- Ponta a Ponta (E2E)
Testa a ação do usuário na aplicação, geralmente usado em aplicações frontend
*/

import 'reflect-metadata'
import express from 'express'
import './database'
import router from './routes'

const app = express();

app.use(express.json())
app.use(router)

app.listen(3333, () => console.log('Server is running!'))