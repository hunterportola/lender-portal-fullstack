// backend/index.js
const express = require('express');
const { createLoan } = require('./controllers/loanController'); // Import the controller

const app = express();
const port = 3002;

// Middleware to parse JSON bodies
app.use(express.json());

// --- Define the API Routes ---
app.post('/api/loans', createLoan); // This route will create a new loan

// A simple test route
app.get('/', (req, res) => {
  res.send('Hello from the Lender Service!');
});

// Start the server
app.listen(port, () => {
  console.log(`Lender Service is running at http://localhost:${port}`);
});