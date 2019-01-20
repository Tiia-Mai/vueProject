
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();

//Middelware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts',posts);

// handle production
if(process.env.NODE_ENV==='production'){
    //static folder
    app.use(express.static(__dirname+'/public/'));

    //handle single page application
    app.get(/.*/, (req, res)=> res.sendFile(__dirname + '/public/index.html'));
}

//port
const port=process.env.PORT || 3000;

app.listen(port, ()=> console.log('Server started'));