import { makeAutoObservable, toJS } from 'mobx';
import { api } from '../../core/api';
import { ListEmployeesPaginatedDto } from './api/list-employees-paginated.dto';

type FetchStatus = 'NOT_STARTED' | 'LOADING' | 'SUCCESS' | 'FAILED';

interface FetchListOfEmployeesParams {
  page?: number | null;
}

interface UpdateEmployeeByUsernameParams {
  firstName: string;
  lastName: string;
  photo: string;
  birthDate: Date;
}

class EmployeeStore {
  listFetchStatus: FetchStatus = 'NOT_STARTED';
  listEmployees: ListEmployeesPaginatedDto['results'] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchListOfEmployees({ page = 1 }: FetchListOfEmployeesParams = {}) {
    this.listFetchStatus = 'LOADING';

    try {
      const { data } = await api.get<ListEmployeesPaginatedDto>('/api/', {
        params: {
          page,
          results: 12,
          seed: 'hr',
        },
      });

      const updatedEmployees = this.getUpdatedEmployees();
      this.listFetchStatus = 'SUCCESS';
      this.listEmployees = data.results.map((employee) => {
        const updatedEmployee = updatedEmployees.find(
          (emp) => emp.login.username === employee.login.username
        );

        return updatedEmployee || employee;
      });
    } catch (e) {
      this.listFetchStatus = 'FAILED';
    }
  }

  findEmployeeByUsername(username: string) {
    return this.listEmployees.find(
      (employee) => employee.login.username === username
    );
  }

  getUpdatedEmployees(): ListEmployeesPaginatedDto['results'] {
    return JSON.parse(localStorage.getItem('updatedEmployees') || '[]');
  }

  async updateEmployeeByUsername(
    username: string,
    data: UpdateEmployeeByUsernameParams
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const employee = toJS(this.findEmployeeByUsername(username));

        if (!employee) {
          throw new Error('no employee');
        }

        employee.name.first = data.firstName;
        employee.name.last = data.lastName;
        employee.picture.large = data.photo;
        employee.dob.date = data.birthDate.toISOString();

        const updatedEmployees = this.getUpdatedEmployees();

        const existingUpdatedEmployeeIndex = updatedEmployees.findIndex(
          (emp) => emp.login.username === username
        );

        if (existingUpdatedEmployeeIndex !== -1) {
          updatedEmployees[existingUpdatedEmployeeIndex] = employee;
        } else {
          updatedEmployees.push(employee);
        }

        this.listEmployees = [];
        this.listFetchStatus = 'NOT_STARTED';

        localStorage.setItem(
          'updatedEmployees',
          JSON.stringify(updatedEmployees)
        );

        resolve(true);
      }, 500);
    });
  }
}

const employeeStoreInstance = new EmployeeStore();

export const useEmployeeStore = () => {
  return employeeStoreInstance;
};
