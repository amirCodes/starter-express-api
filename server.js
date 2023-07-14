import path from 'path';
import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();
const corsOptions = {
    origin: ['https://infosys-auth-api.onrender.com', 'https://infosys-auth-api.onrender.com/auth', 'https://infosys-auth-api.onrender.com/logout', 'https://infosys-auth-api.onrender.com/profile', 'http://localhost:5173', 'http://175.136.235.174', 'http://175.136.235.172', 'http://localhost'],
    AccessControlAllowOrigin: ['https://infosys-auth-api.onrender.com', 'https://infosys-auth-api.onrender.com/auth', 'https://infosys-auth-api.onrender.com/register', 'http://localhost:5173', 'http://175.136.235.174', 'http://175.136.235.172', 'http://localhost'],
    Credential: true,
    methods: 'GET,HEAD,PUT,UPDATE,PATCH,POST,DELETE'
}
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://192.168.56.1:5173');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
    // app.get('*', (req, res) => {
    //     res.send('Welcome to InfosysGateway API application. profile[get,put], logout[post], auth[post]');
    // });
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/dist')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));