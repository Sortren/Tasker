import express from 'express';
import bodyParser from 'body-parser';
import tasksRoute from './routes/tasks.js';
import loginRoute from './routes/login.js';
import registerRoute from './routes/register.js';
import authorizationRoute from './routes/authorize.js';
import cors from 'cors';
import './controllers/DatabaseConnection.js' //connection to the mongodb is automatically done with import (function invokes) 


const app = express();
const PORT = 2000;

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/tasks', tasksRoute);
app.use('/authorize', authorizationRoute);



app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));
