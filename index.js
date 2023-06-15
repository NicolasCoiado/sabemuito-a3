import express from 'express';

import routeUsuario from './routes/usuario.js';
import routeProva from './routes/prova.js';
import routeTrabalho from './routes/trabalho.js';
import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(routeUsuario);
app.use(routeProva);
app.use(routeTrabalho);

const port = PORT;

app.listen(port, () => {
    console.log("Servidor ativo na porta", port);
});