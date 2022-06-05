import { titleLettersConvert } from 'config/app';
import DropDown from 'core/DropDown';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { StoreType } from 'store';
import AvatarDropdown from './components/AvatarDropdown';
import './style.scss';

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const { firstName, lastName, profileImage, email } = useSelector(
    (store: StoreType) => store.ProfileReducer
  );
  const { auth, loading: authLoading } = useSelector(
    (store: StoreType) => store.AuthReducer
  );

  return (
    <div className='header'>
      <div className='header__brand'>
        <span>Trello</span>
      </div>

      <div className='header__body'>
        {auth && !authLoading && (
          <button
            type='button'
            className='add__workspace text-white'
            style={{ marginRight: '10px' }}
            onClick={() =>
              history.push({
                pathname: 'create-workspace',
                state: { background: location }
              })
            }
          >
            Create Workspace
          </button>
        )}

        {!auth && !authLoading && (
          <Link
            to='/'
            className='add__workspace text-white'
            style={{ marginRight: '10px', textDecoration: 'none' }}
          >
            Sign In
          </Link>
        )}

        {!auth && !authLoading && (
          <Link
            to='/signup'
            className='add__workspace text-white'
            style={{ marginRight: '10px', textDecoration: 'none' }}
          >
            Sign Up
          </Link>
        )}

        {auth && !authLoading && (
          <DropDown
            buttonId='header-avatar'
            title='Header Avatar'
            buttonClass='avatar__div'
            hideTitle
            buttonText={
              profileImage ? (
                <img src={profileImage} alt='dp' />
              ) : (
                <div className=''>
                  <span>{`${titleLettersConvert(
                    firstName
                  )}${titleLettersConvert(lastName)}`}</span>
                </div>
              )
            }
            className='header__dropdown'
          >
            <AvatarDropdown
              firstName={firstName}
              lastName={lastName}
              email={email}
              profileImage={profileImage}
            />
          </DropDown>
        )}
      </div>
    </div>
  );
};

export default Header;
