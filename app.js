const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const methodOverride = require('method-override');
const {logger} = require('./middleware/logEvents');
const {errorHandler} = require('./middleware/errorHandler');

const app = express();

app.use(logger);

//app.use(cors(corsOptions)); //autorise la whitelist
app.use(cors()); //autorise tous les sites

app.use(express.urlencoded({extended: false})); //to use .body
app.use(express.json()); //middleware for json
app.use('/',express.static(path.join(__dirname,'/public'))); //serve static files (css,txt,img)
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

//routes
app.use('/',require('./routes/web'));
app.use('/api/users',require('./routes/api'));

//app.all('*') pour customise les differents formats (json,txt,html)
app.get('/*', (req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.use(errorHandler);

module.exports = app