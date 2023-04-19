import { FC } from 'react';
import { Card } from 'flowbite-react';
import { DateTime } from 'luxon';
import { redirect, useNavigate } from 'react-router-dom';

interface EmployeeCardProps {
  name: string;
  dob: Date;
  photo: string;
  username: string;
}

export const EmployeeCard: FC<EmployeeCardProps> = ({
  name,
  dob,
  photo,
  username,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/employee/${username}`);
  };

  return (
    <div className="w-96 cursor-pointer" onClick={handleClick}>
      <Card>
        <img
          src={photo}
          alt={`photo-${photo}`}
          className="h-96 object-fill rounded"
        />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Date of birth:{' '}
          {DateTime.fromJSDate(dob).toLocaleString(DateTime.DATE_FULL)}
        </p>
      </Card>
    </div>
  );
};
