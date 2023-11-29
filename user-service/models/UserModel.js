const bcrypt = require('bcrypt');
const pool = require('../services/DatabaseConnection')

class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  
    async register(req, res) {
      pool.getConnection(async (err, connection) => {
        if (err) {
          // Send error response to the caller
          return res.status(500).json({ error: 'Failed to obtain a database connection' });
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const params = {
          username: this.username,
          password: hashedPassword,
          email: req.body.email,
          role: req.body.role,
          name: req.body.name
        };
        
        // Check if the role is "student" and append subscription type accordingly
        if (req.body.role === 'student') {
          params.specificProperty = req.body.specificProperty;
        }
        
        connection.query('INSERT INTO user_details SET ?', params, (err, rows) => {
          connection.release(); // return the connection to pool
          if (err) {
            console.log(err);
            // Send error response to the caller
            return res.status(500).json({ error: 'Error registering user' });
          }
  
          // Send success response to the caller
          res.status(200).json({ message: `Registration Successful.` });
        });
      });
    }

    async login(userData) {
      const { req, res } = userData;
  
      try {
        pool.getConnection((err, connection) => {
          if (err) {
            // Send error response to the caller
            return res.status(500).json({ error: 'Failed to obtain a database connection' });
          }
  
          connection.query(
            'SELECT * FROM user_details WHERE username = ?',
            [this.username],
            async (err, rows) => {
              connection.release(); // return the connection to pool
              if (err) {
                console.error(err);
                // Send error response to the caller
                return res.status(500).json({ error: 'Error querying user from the database' });
              }
  
              if (rows.length > 0) {
                const hashedPassword = rows[0].password;
  
                // Compare the provided password with the stored hashed password
                const passwordMatch = await bcrypt.compare(this.password, hashedPassword);
  
                if (passwordMatch) {
                  // Passwords match, send success response
                  res.status(200).json({ message: 'Login successful.' });
                } else {
                  // Passwords do not match, send error response
                  res.status(401).json({ error: 'Invalid username or password.' });
                }
              } else {
                // User not found, send error response
                res.status(401).json({ error: 'Invalid username or password.' });
              }
            }
          );
        });
      } catch (error) {
        console.error(error);
        // Send error response to the caller
        res.status(500).json({ error: 'Error querying user from the database' });
      }
    }
  } 
  
  module.exports = User;
  