var winston = require('winston');

winston.configure({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ 
            name: 'info-log',
            filename: 'info.log',
            level: 'info'
        }),
        new (winston.transports.File)({ 
            name: 'error-log',
            filename: 'error.log',
            level: 'error' 
        })
    ]
});

module.exports = winston;