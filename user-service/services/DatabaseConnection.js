const mysql = require('mysql')

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : '',
    user            : 'curiomind',
    password        : '1q2w3e4r5t',
    database        : 'curiomind'
})
   
module.exports = pool; 


