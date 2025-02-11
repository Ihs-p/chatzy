const express = require('express')
const cors = require('cors')
const { connectDB } = require('./lib/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const { app, server } = require('./lib/socket')

const PORT = process.env.PORT
const path = require('path')    

const __dirname = path.resolve()


app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))






app.get('/', (req, res) => {
    res.send('chat api is working!')
})  

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/messages', require('./routes/message.route'))


if( process.env.NODE_ENV === 'production' ) {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

server.listen(PORT, () => {
    console.log('app listening on port port:', PORT)
    connectDB()
})