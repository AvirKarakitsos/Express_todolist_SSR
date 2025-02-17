const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async(message,file) => {
    const dateTime = format(new Date(), 'yyyMMdd\tHH:mm:ss');
    const logItem  = dateTime+'\t'+uuid()+'\t'+message+'\n';
    
    try{
        if (!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromise.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromise.appendFile(path.join(__dirname,'..','logs',file),logItem);
    }catch (err){
        console.log(err)
    }
}

const logger = (req,res,next) => {
    logEvents(req.method+'\t'+req.headers.origin+'\t'+req.url,'reqLog.txt');
    next();
}

module.exports = { logEvents, logger };
