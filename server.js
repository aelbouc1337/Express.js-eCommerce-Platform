const express = require('express')
const server = express();
const mongoose = require('mongoose');
const user = require('./models/user.Schema');
const authRouter = require('./routes/authRoutes');
const productsRouter = require('./routes/productsRoutes');
const userRouter = require('./routes/userRoutes');


server.use(express.json());
server.use(express.urlencoded());

require('dotenv').config();

const DB_Cn = process.env.DATABASE_CONN_STRING;
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_Cn)
.then((conn)=> {
    console.log(conn.connections)
    console.log('Connection Success')})
.catch(err => {console.log(err.message)})

server.use('/api/auth',authRouter)
server.use('/api/products',productsRouter)
server.use('/api/profile',userRouter)

server.listen(PORT , ()=> console.log(`listenning on port ${PORT}`))