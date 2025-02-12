import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

// Routes
const authRoute = (await import('./routes/auth.route.js')).default;
const messageRoute = (await import('./routes/message.route.js')).default;
app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);

app.get('/', (req, res) => {
    res.send('Chat API is working!');
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.use(express.static(path.join(__dirname, 'frontend/dist')));


    app.get('*', (req, res, next) => {
        const indexPath = path.join(__dirname, '../frontend/dist/index.html');
        res.sendFile(indexPath, (err) => {
            if (err) {
                next(err);
            }
        });
    });
}

// Start Server
server.listen(PORT, () => {
    console.log(`App listening on port: ${PORT} in ${process.env.NODE_ENV} mode`);
    connectDB();
});
