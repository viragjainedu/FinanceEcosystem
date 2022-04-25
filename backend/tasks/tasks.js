const cron = require('node-cron');

module.exports = () => {  
    cron.schedule('* * * * * *', () => {
        console.log('running a task every 1 second');
    });
}
