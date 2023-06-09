import { FC } from 'react';
import { useEmployeeStore } from '../store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import { DateTime } from 'luxon';
import { HrButton } from '../../../common/components/hr-button.component';
import { observer } from 'mobx-react';

interface EmployeeInfoPageProps {}

export const EmployeeInfoPage: FC<EmployeeInfoPageProps> = observer(({}) => {
  const employeeStore = useEmployeeStore();
  const params = useParams();
  const employee = employeeStore.findEmployeeByUsername(params?.username || '');
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleEditClick = () => {
    navigate(`/employee/${params.username}/edit`);
  };
  const handleDeleteClick = async () => {
    await employeeStore.deleteEmployeeByUsername(`${params.username}`);

    navigate(`/?${state.page}`, { replace: true });
  };

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
    <div className="flex flex-col justify-center items-center my-8">
      <h5 className="text-5xl font-bold tracking-tight text-gray-900 text-center">
        {employee?.name.first} {employee?.name.first}
      </h5>
      <img src={employee.picture.large} className="mt-8" />
      <p className="text-center text-2xl mt-8">
        Date of birth:{' '}
        {DateTime.fromISO(
          employee?.dob.date || new Date().toISOString()
        ).toLocaleString(DateTime.DATE_FULL)}
      </p>
      <div>
        <HrButton className="w-36 my-4" onClick={handleEditClick}>
          Edit
        </HrButton>
        <HrButton
          color="failure"
          className="w-36 my-4"
          onClick={handleDeleteClick}
          isLoading={employeeStore.deleteEmployeeStatus === 'LOADING'}
        >
          Delete
        </HrButton>
      </div>
    </div>
  );
});
