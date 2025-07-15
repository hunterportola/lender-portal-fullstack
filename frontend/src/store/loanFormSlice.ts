// src/store/loanFormSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the shape of our form data
interface LoanFormState {
  borrower: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthMonth: string;
    birthDay: string;
    birthYear: string;
    ssn: string; // <-- ADD THIS
  };
  employment: {
    status: string;
    employerName: string;
    jobTitle: string;
    // REMOVE startDate and ADD these three:
    startMonth: string;
    startDay: string;
    startYear: string;
  };
  loan: {
    originalLoanAmount: string;
    interestRate: string;
    loanTerm: string;
    issueDate: string;
    maturityDate: string;
  };
}

const initialState: LoanFormState = {
  borrower: {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    ssn: '', // <-- ADD THIS
  },
  employment: {
    status: '',
    employerName: '',
    jobTitle: '',
    // REMOVE startDate and ADD these three:
    startMonth: '',
    startDay: '',
    startYear: '',
  },
  loan: {
    originalLoanAmount: '',
    interestRate: '',
    loanTerm: '',
    issueDate: '',
    maturityDate: '',
  },
};

// ... (the rest of the file stays the same)

interface UpdateFieldPayload {
  section: keyof LoanFormState;
  field: string;
  value: string;
}

export const loanFormSlice = createSlice({
  name: 'loanForm',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { section, field, value } = action.payload;
      (state[section] as any)[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = loanFormSlice.actions;
export default loanFormSlice.reducer;