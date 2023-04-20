import { FC, PropsWithChildren } from 'react';
import { Navbar } from 'flowbite-react';
import { useAuthStore } from '../../modules/auth/store';
import { HrButton } from './hr-button.component';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {}

export const Layout: FC<PropsWithChildren<LayoutProps>> = observer(
  ({ children }) => {
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
      navigate('/login');
      authStore.logout();
    };
    return (
      <>
        <Navbar fluid={true}>
          <Navbar.Brand href="/">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              HRBite
            </span>
          </Navbar.Brand>
          {authStore.isLoggedIn && (
            <div className="flex md:order-2">
              <HrButton
                isLoading={authStore.logoutStatus === 'LOADING'}
                onClick={handleLogoutClick}
              >
                Log out
              </HrButton>
            </div>
          )}
        </Navbar>
        <main>{children}</main>
      </>
    );
  }
);
