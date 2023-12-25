//Cross Origin Resource Sharing, sites ayant acces au server
const whitelist = ['https://www.google.com','http://127.0.0.1:8000','http://localhost:3500'];

const corsOptions = {
    origin: (origin,callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin){ //!origin := undefined
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;