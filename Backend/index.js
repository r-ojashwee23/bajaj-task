const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Sample user data
const userId = "ojashwee_raman_23032003";
const email = "r.ojashwee23@gmail.com";
const rollNumber = "21BAI1030";

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    if (!Array.isArray(data.data)) {
        return res.status(400).json({ error: 'Invalid input format' });
    }

    const numbers = [];
    const alphabets = [];

    data.data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
        }
    });

    const lowestLowercase = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercaseAlphabet = lowestLowercase.length > 0 ? [lowestLowercase.sort().pop()] : [];

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});