// Obs: no ormconfig pode adicionar a funcionalidade logging:true para mostrar exatamente quais são as requisições ao banco de dados

import app from "./app";

app.listen(3333, () => console.log('Server is running!'))