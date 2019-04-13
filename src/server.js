const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path'); 
const cors = require('cors'); 


const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

// conectando o usuario a uma sala unica
io.on('connection', socket => {// assim que o usuario conectar vai bater aqui
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-iw0aq.mongodb.net/omnistack?retryWrites=true",{
    useNewUrlParser: true
});

const bodyParser = require('body-parser');

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.urlencoded({ extended : true})); // Permite o envio de arquivos 
app.use(express.json()); // permite que o servidor trabalhe com json
// sempre que o caminho /files for acessado ele joga para a pasta tmp
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);