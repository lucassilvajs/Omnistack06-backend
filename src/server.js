const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const Ddos = require('ddos');

var ddos = new Ddos({burst:10, limit:2})
const app = express();

app.use(cors());
app.use(ddos.express);

const server = require('http').Server(app)
const io = require('socket.io')(server, { origins: '*:*'});

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});


mongoose.connect('mongodb+srv://semana:semana@cluster0-43ss0.mongodb.net/tindev?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    }
);

app.use((req, res, next) => {
    req.io = io
    return next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/files", express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
