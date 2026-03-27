const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Main Route
app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running!');
});

// Contact Endpoint
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic Validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Insert into database
        const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
        await db.query(query, [name, email, message]);

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Internal server error while saving data.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
