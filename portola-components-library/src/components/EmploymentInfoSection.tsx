import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { updateUserField } from '../store/userSlice';
import type { UserState } from '../store/userSlice';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { InputLarge } from './InputLarge';
import { Dropdown } from './Dropdown';

interface EmploymentInfoSectionProps {
  user: UserState;
}

export function EmploymentInfoSection({ user }: EmploymentInfoSectionProps) {
  const dispatch: AppDispatch = useDispatch();

  const handleFieldChange = (field: keyof UserState, value: string) => {
    dispatch(updateUserField({ field, value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Dropdown 
            label="Employment Status"
            value={user.employmentStatus}
            onChange={(val) => handleFieldChange('employmentStatus', val)}
            options={[{ value: 'Full-time', label: 'Full-time' }, { value: 'Part-time', label: 'Part-time' }, { value: 'Self-employed', label: 'Self-employed' }, { value: 'Unemployed', label: 'Unemployed' }]}
          />
          <InputLarge 
            label="Employer Name" 
            value={user.employerName}
            onChange={(e) => handleFieldChange('employerName', e.target.value)}
          />
          <InputLarge 
            label="Job Title" 
            value={user.jobTitle}
            onChange={(e) => handleFieldChange('jobTitle', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}