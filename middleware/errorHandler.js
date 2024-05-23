const path = require("path")
const {logEvents} = require('./logEvents');

const errorHandler = (err,req,res,next) => {
    logEvents(err.name+': '+err.message, 'errLog.txt');
    //res.status(500).send(err.message);
    res.status(400).sendFile(path.join(__dirname,'..','views','404.html'));
}

module.exports = {errorHandler};