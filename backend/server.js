const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/card-game', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Routes
const users = require('./routes/users');
app.use('/api/users', users);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

