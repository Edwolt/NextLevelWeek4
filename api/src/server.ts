// Obs: no ormconfig pode adicionar a funcionalidade logging:true para mostrar exatamente quais são as requisições ao banco de dados
import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import createConnection from './database'
import router from './routes'
import AppError from './error/AppErros'

createConnection()
const app = express()

app.use(express.json())
app.use(router)

app.use((err: Error, req: Request, res: Response, nex: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json({ status: 'Error', message: `Internal server error ${err.message}` })
})

app.listen(3333, () => console.log('Server is running!'))