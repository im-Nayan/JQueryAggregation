const express = require('express');
const path = require('path');

const PORT = 3000;

const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')));




app.set('view engine', 'ejs');
app.set('views','views')

// DEFINE ROUTER
const route = require('./Router/router');
app.use(route);




mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://nayan:nayan123@cluster0.o2qoh.mongodb.net/jquerytest', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(connect=>{
    app.listen(PORT,()=>{
        console.log('port no 3000');
        console.log(`http://127.0.0.1:${PORT}`);
        console.log(`http://127.0.0.1:${PORT}/state`);
        console.log(`http://127.0.0.1:${PORT}/city`);

    })
})
