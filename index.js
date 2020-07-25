const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const members=require('./Members');
const logger = require('./middleware/Logger');

//Create Express app
const app = express();


//Init middleware
// app.use(logger);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Home route
app.get('/',(req,res)=>res.render('index',{
	title:'Member App',
	members
}));

//Set static folder to serve up all files in public folder
app.use(express.static(path.join(__dirname,'public')));

//Routes
app.use('/api/members',require('./routes/api/members'))

//Port setup
const PORT = process.env.PORT || 5000; 
app.listen(PORT,()=>console.log(`Server started on ${PORT}`));