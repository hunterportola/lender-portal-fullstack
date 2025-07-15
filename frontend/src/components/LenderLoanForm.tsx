import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'; // Import axios
import type { RootState, AppDispatch } from '../store/store';
import { updateField, resetForm } from '../store/loanFormSlice'; // Import resetForm
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import { InputLarge } from './InputLarge';
import { Dropdown } from './Dropdown';
import { MonthInput } from './MonthInput';
import { DayInput } from './DayInput';
import { YearInput } from './YearInput';
import { PhoneInput } from './PhoneInput';
import { SimpleDateInput } from './SimpleDateInput';
import { SocialSecurityNumberInput } from './SocialSecurityNumberInput';

export function LenderLoanForm() {
  const dispatch: AppDispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.loanForm);

  const handleFieldChange = (section: keyof RootState['loanForm'], field: string, value: string) => {
    dispatch(updateField({ section, field, value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Loan Data:", formState);
    try {
      // Send the form state to the backend API
      const response = await axios.post('http://localhost:3002/api/loans', formState);
      
      if (response.status === 201) {
        alert(`Loan created successfully! New Loan ID: ${response.data.id}`);
        dispatch(resetForm()); // Reset the form after successful submission
      } else {
        alert(`An error occurred: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Failed to submit loan data:", error);
      alert('Failed to submit loan data. Make sure the Lender Service backend is running.');
    }
  };

  return (
    <div className="min-h-screen bg-sand p-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Borrower Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle>Borrower Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputLarge
                label="Borrower User ID"
                value={formState.borrower.userId}
                onChange={(e) => handleFieldChange('borrower', 'userId', e.target.value)}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <InputLarge
                  label="First Name"
                  value={formState.borrower.firstName}
                  onChange={(e) => handleFieldChange('borrower', 'firstName', e.target.value)}
                />
                <InputLarge
                  label="Last Name"
                  value={formState.borrower.lastName}
                  onChange={(e) => handleFieldChange('borrower', 'lastName', e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <InputLarge
                  label="Email"
                  type="email"
                  value={formState.borrower.email}
                  onChange={(e) => handleFieldChange('borrower', 'email', e.target.value)}
                />
                <PhoneInput
                  label="Phone Number"
                  value={formState.borrower.phoneNumber}
                  onChange={(val) => handleFieldChange('borrower', 'phoneNumber', val)}
                  size="large"
                />
              </div>
              <div>
                <label className="text-sm font-sans text-steel px-1">Date of Birth</label>
                <div className="grid grid-cols-3 gap-x-4">
                  <MonthInput size="large" label="Month" value={formState.borrower.birthMonth} onChange={(val) => handleFieldChange('borrower', 'birthMonth', val)} />
                  <DayInput size="large" label="Day" value={formState.borrower.birthDay} onChange={(val) => handleFieldChange('borrower', 'birthDay', val)} />
                  <YearInput size="large" label="Year" value={formState.borrower.birthYear} onChange={(val) => handleFieldChange('borrower', 'birthYear', val)} />
                </div>
              </div>
              <SocialSecurityNumberInput
                label="Social Security Number"
                value={formState.borrower.ssn}
                onChange={(val) => handleFieldChange('borrower', 'ssn', val)}
              />
            </CardContent>
          </Card>

          {/* Borrower Employment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Borrower Employment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dropdown
                label="Employment Status"
                size="large"
                value={formState.employment.status}
                onChange={(val) => handleFieldChange('employment', 'status', val)}
                options={[
                  { value: 'Full-time', label: 'Full-time' },
                  { value: 'Part-time', label: 'Part-time' },
                  { value: 'Self-employed', label: 'Self-employed' },
                  { value: 'Unemployed', label: 'Unemployed' },
                ]}
              />
              <InputLarge
                label="Employer Name"
                value={formState.employment.employerName}
                onChange={(e) => handleFieldChange('employment', 'employerName', e.target.value)}
              />
              <InputLarge
                label="Job Title"
                value={formState.employment.jobTitle}
                onChange={(e) => handleFieldChange('employment', 'jobTitle', e.target.value)}
              />
              <div>
                <label className="text-sm font-sans text-steel px-1">Employment Start Date</label>
                <div className="grid grid-cols-3 gap-x-4">
                    <MonthInput size="large" label="Month" value={formState.employment.startMonth} onChange={(val) => handleFieldChange('employment', 'startMonth', val)} />
                    <DayInput size="large" label="Day" value={formState.employment.startDay} onChange={(val) => handleFieldChange('employment', 'startDay', val)} />
                    <YearInput size="large" label="Year" value={formState.employment.startYear} onChange={(val) => handleFieldChange('employment', 'startYear', val)} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Loan Details */}
          <Card>
             <CardHeader>
                <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <InputLarge label="Original Loan Amount ($)" value={formState.loan.originalLoanAmount} onChange={e => handleFieldChange('loan', 'originalLoanAmount', e.target.value)} />
                    <InputLarge label="Interest Rate (%)" value={formState.loan.interestRate} onChange={e => handleFieldChange('loan', 'interestRate', e.target.value)} />
                </div>
                 <div className="grid md:grid-cols-2 gap-4">
                    <InputLarge label="Loan Term (Months)" value={formState.loan.loanTerm} onChange={e => handleFieldChange('loan', 'loanTerm', e.target.value)} />
                    <SimpleDateInput label="Issue Date" value={formState.loan.issueDate} onChange={val => handleFieldChange('loan', 'issueDate', val)} />
                </div>
                 <SimpleDateInput label="Maturity Date" value={formState.loan.maturityDate} onChange={val => handleFieldChange('loan', 'maturityDate', val)} />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            Create Loan and Attach to Borrower
          </Button>
        </form>
      </div>
    </div>
  );
}