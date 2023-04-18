import { FC } from 'react';
import { useEmployeeStore } from '../store';
import { useParams } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import { DateTime } from 'luxon';

interface EmployeeInfoPageProps {}

export const EmployeeInfoPage: FC<EmployeeInfoPageProps> = ({}) => {
  const employeeStore = useEmployeeStore();
  const params = useParams();
  const employee = employeeStore.findEmployeeByUsername(params?.username || '');

  if (!employee) {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">Error!</span> Something bad happened,
          please try again later :(
        </span>
      </Alert>
    );
  }

  return (
    <div className="my-8">
      <h5 className="text-5xl font-bold tracking-tight text-gray-900 text-center">
        {employee?.name.first} {employee?.name.first}
      </h5>
      <img src={employee.picture.large} className="mx-auto mt-8" />
      <p className="text-center text-2xl mt-8">
        Date of birth:{' '}
        {DateTime.fromISO(
          employee?.dob.date || new Date().toISOString()
        ).toLocaleString(DateTime.DATE_FULL)}
      </p>
    </div>
  );
};
