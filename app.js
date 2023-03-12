require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();


app.use(express.json());

app.get('/', (req, res) => { res.send("Welcome to Contact Manager API");})
app.use('/api/contact', require('./routes/contactRoutes'));


app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Listening on Port http://localhost:${PORT}`);
});