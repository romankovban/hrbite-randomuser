import { observer } from 'mobx-react';
import { FC, useEffect } from 'react';
import { Alert, Pagination, Spinner } from 'flowbite-react';
import { useEmployeeStore } from '../store';
import { EmployeeCard } from '../components/employee-card.component';
import { useSearchParams } from 'react-router-dom';

interface ListEmployeesProps {}

export const ListEmployees: FC<ListEmployeesProps> = observer(({}) => {
  const employeeStore = useEmployeeStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');

  useEffect(() => {
    if (employeeStore.listFetchStatus === 'NOT_STARTED') {
      employeeStore.fetchListOfEmployees({ page: page ? Number(page) : null });
    }
  }, []);

  const onPageChange = (page: number) => {
    setSearchParams({ page: String(page) });
    employeeStore.fetchListOfEmployees({ page });
  };

  if (employeeStore.listFetchStatus === 'LOADING') {
    return (
      <div className="flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }

  if (employeeStore.listFetchStatus === 'FAILED') {
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
    <div className="flex flex-col justify-center  my-8">
      <div className="flex flex-wrap justify-center gap-8 my-8">
        {employeeStore.listEmployees.map((employee) => (
          <EmployeeCard
            key={`employee-${employee.login.uuid}`}
            name={`${employee.name.first} ${employee.name.last}`}
            dob={new Date(employee.dob.date)}
            photo={employee.picture.large}
            username={employee.login.username}
          />
        ))}
      </div>
      <div className="self-center">
        <Pagination
          currentPage={page ? Number(page) : 1}
          totalPages={10}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
});
