const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app)
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/files", express.static(path.resolve(__dirname, '..', 'tmp')))
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

app.use(require('./routes'));

app.listen(process.env.PORT || 3333);