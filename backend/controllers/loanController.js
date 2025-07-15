// backend/controllers/loanController.js
const store = require('../database');

const createLoan = async (req, res) => {
  // Open a session to the database
  const session = store.openSession();

  try {
    // Get the loan data from the request body
    const loanData = req.body;

    // Create a new loan document object
    const newLoan = {
      ...loanData,
      // The collection name is specified here
      '@metadata': {
        '@collection': 'Loans'
      }
    };

    // Store the new document in the session
    await session.store(newLoan);

    // Save the changes to the database
    await session.saveChanges();

    console.log('New loan document saved:', newLoan);
    res.status(201).send({ message: 'Loan created successfully', id: newLoan.id });
  } catch (error) {
    console.error('Failed to create loan:', error);
    res.status(500).send({ message: 'Failed to create loan' });
  }
};

module.exports = {
  createLoan
};