import { Button, Spinner } from 'flowbite-react';
import { ComponentProps, FC, PropsWithChildren } from 'react';

interface HrButtonProps extends ComponentProps<typeof Button> {
  isLoading?: boolean;
}

export const HrButton: FC<HrButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      {isLoading ? (
        <>
          <div className="mr-3">
            <Spinner size="sm" light={true} />
          </div>
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};
