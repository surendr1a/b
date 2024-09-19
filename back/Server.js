const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection (replace with your MongoDB Atlas URI)
mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// API Routes
app.use('/api/users', userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../front/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../front/build/index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
