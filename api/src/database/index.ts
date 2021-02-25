import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
    const options = await getConnectionOptions()
    const database = process.env.NODE_ENV == 'test' ? './src/database/database.test.sqlite' : options.database
    return createConnection(Object.assign(options, { database }))
}