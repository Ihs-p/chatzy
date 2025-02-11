import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js';
const authRoute = (await import('./routes/auth.route.js')).default;
const messageRoute = (await import('./routes/message.route.js')).default;


dotenv.config();

const PORT = process.env.PORT;
import path from 'path';

const __dirname = path.resolve();



app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());


app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))






app.get('/', (req, res) => {
    res.send('chat api is working!')
})  

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);



if( process.env.NODE_ENV === 'production' ) {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

server.listen(PORT, () => {
    console.log('app listening on port:', PORT,process.env.NODE_ENV);
    connectDB();
});
