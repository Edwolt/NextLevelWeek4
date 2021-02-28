// Obs: no ormconfig pode adicionar a funcionalidade logging:true para mostrar exatamente quais são as requisições ao banco de dados
import 'reflect-metadata'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import express, { NextFunction, Request, Response } from 'express'
import connect from './database'
import 'express-async-errors'
import AppError from './error/AppError'
import router from './routes'

connect()
const app = express()

app.use(express.json())
app.use(router)

app.use((err: Error, req: Request, res: Response, nex: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(500).json({ status: 'Error', message: `Internal server error ${err.message}` })
})

export default app