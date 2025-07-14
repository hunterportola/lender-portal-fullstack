import express from 'express';
import cors from 'cors';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import 'dotenv/config';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- Plaid Configuration ---
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);


// --- In-Memory Data Store ---
// We use 'let' to allow this object to be modified
let userData = {
  firstName: 'John',
  lastName: 'Harper',
  email: 'Harper5755@yopmail.com',
  phoneNumber: '555-123-4567',
  maritalStatus: 'Married',
  education: 'Bachelor\'s degree',
  birthDay: '13',
  birthMonth: '10',
  birthYear: '1985',
  bankName: 'Commonwealth Bank',
  accountHolderName: 'John Harper',
  bsb: '062-000',
  accountNumber: '123456789',
  employmentStatus: 'Full-time',
  employerName: 'Tech Solutions Inc.',
  jobTitle: 'Senior Software Engineer',
  idDocument: 'passport.pdf',
};

const loanData = {
  originalAmount: 7000.00,
  outstandingBalance: 6440.32,
  nextPaymentAmount: 676.00,
  loanTerm: 12,
  interestRate: 12,
  principalDebt: 6404.45,
  interestBalance: 35.87,
  overduePrincipalDebt: 0,
  overdueInterest: 0,
  issueDate: 'Nov 29, 2024',
  maturityDate: 'Dec 15, 2025',
  endDate: 'Dec 29, 2025',
  outstandingLTV: 99.08,
};

const activityData = {
  items: [
    { id: '1', message: 'Please, sign the agreement for the loan application', timestamp: 'Nov 29, 20:48', actionType: 'sign' },
    { id: '2', message: 'Please, provide an additional information for the loan application', timestamp: 'Nov 29, 20:48', actionType: 'add-info' },
  ],
};


// --- API Endpoints ---
app.get('/api/user', (req, res) => res.json(userData));
app.get('/api/loan', (req, res) => res.json(loanData));
app.get('/api/activities', (req, res) => res.json(activityData.items));

app.post('/api/create_link_token', async (req, res) => {
  try {
    const createTokenRequest = {
      user: { client_user_id: 'user-id-from-your-db' },
      client_name: 'Portola Borrower Portal',
      products: ['auth'],
      country_codes: ['US'],
      language: 'en',
    };
    const tokenResponse = await plaidClient.linkTokenCreate(createTokenRequest);
    res.json(tokenResponse.data);
  } catch (error) {
    console.error("Error creating Plaid link token:", error.response?.data);
    res.status(500).json({ error: 'Failed to create Plaid link token' });
  }
});

app.post('/api/exchange_public_token', async (req, res) => {
  try {
    const { public_token } = req.body;
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const authResponse = await plaidClient.authGet({ access_token: accessToken });
    const account = authResponse.data.accounts[0];

    const newBankDetails = {
        bankName: account.name,
        accountHolderName: account.owners && account.owners.length > 0 ? account.owners[0].names[0] : 'Not Available',
        accountNumber: account.account_id,
    };

    // Update our server's in-memory data
    userData = {
      ...userData,
      ...newBankDetails,
    };

    console.log('✅ New account linked. Sending back updated details.');
    
    // Send the new bank details back to the frontend
    res.json(newBankDetails);

  } catch (error) {
    console.error("Error in token exchange or auth get:", error.response?.data);
    res.status(500).json({ error: 'Failed during Plaid integration' });
  }
});


app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});