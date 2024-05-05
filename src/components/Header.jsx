import { NavLink } from 'react-router-dom';
import './Header.css';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from './Button';
import { useLogout } from '../hooks/useLogout';
function Header() {
  const { user } = useAuthContext();
  // const navigate = useNavigate();
  const { logout } = useLogout();

  function handleButtonClick() {
    logout();
  }

  return (
    <header className='main-header'>
      <div className='container'>
        <h3 className='brand'>MernAuth</h3>
        <nav className='nav-menu'>
          <ul>
            {user && (
              <>
                <li>{user}</li>
                <Button
                  btnType='headerBtn'
                  color='danger'
                  onClick={handleButtonClick}
                >
                  Logout
                </Button>
              </>
            )}
            {!user && (
              <>
                <NavLink className='nav-link' to='/login'>
                  <Button btnType='headerBtn' color='primary'>
                    Login
                  </Button>
                </NavLink>
                <NavLink className='nav-link' to='/register'>
                  <Button btnType='headerBtn' color='secondary'>
                    Register
                  </Button>
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
