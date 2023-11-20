const pool = require('../services/DatabaseConnection')

class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  
    register() {
        // pool.getConnection((err, connection) => {
        //     if(err) throw err
            
        //     const params = 'req.body'
        //     connection.query('INSERT INTO user_details SET ?', params, (err, rows) => {
        //     connection.release() // return the connection to pool
        //     if (!err) {
        //         res.send(`User with the record ID  has been added.`)
        //     } else {
        //         console.log(err)
        //     }
            
        //     console.log('The data from user table are:11 \n', rows)
    
        //     })
        // })

        pool.getConnection((err, connection) => {
            if(err) throw err
            console.log('connected as id ' + connection.threadId)
            connection.query('SELECT * from user_details', (err, rows) => {
                connection.release() // return the connection to pool
    
                if (!err) {
                    console.log(rows)
                } else {
                    console.log(err)
                }
    
                // if(err) throw err
                console.log('The data from user table are: \n', rows)
            })
        })

      // Common registration logic
      console.log(`User ${this.username} registered.`);
    }
  }
  
  module.exports = User;
  