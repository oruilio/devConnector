const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false })); //include bodyparser in app, bodypaser is included in express now

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;  //look for an environment variable called Port when we deploy to the Heroku
                                        //locally 5000
                                        
app.listen(PORT, () => console.log(`Server started on prot ${PORT}`));