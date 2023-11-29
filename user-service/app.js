
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');

const app = express();
const port = 5050;

app.use(bodyParser.json());

// Use the user routes
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/',(req,res)=>{
    res.send("hello world")
})
