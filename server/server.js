import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './controllers/DatabaseConnection.js' //connection to the mongodb is automatically done with import (function invokes) 


const app = express();
const PORT = 2000;

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());




app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));
