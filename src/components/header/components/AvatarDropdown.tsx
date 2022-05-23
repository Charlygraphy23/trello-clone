import { signOut } from 'api';
import { titleLettersConvert } from 'config/app';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOutAction } from 'store/actions';

type Props = {
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
};

const AvatarDropdown = ({
  email,
  firstName,
  lastName,
  profileImage
}: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    signOut()
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(signOutAction());
        history.replace('/');
      });
  }, []);

  return (
    <div className='avatarDropdown'>
      <section className='profile__details'>
        <div className='avatar__div'>
          {profileImage ? (
            <img src={profileImage} alt='dp' />
          ) : (
            <span>{`${titleLettersConvert(firstName)}${titleLettersConvert(
              lastName
            )}`}</span>
          )}
        </div>

        <div className='profile__info'>
          <p>{`${firstName} ${lastName}`}</p>
          <p>{email}</p>
        </div>
      </section>

      <div className='app__divider' />

      <ul className='avatarDropdown__list'>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <li className='avatarDropdown__list-item' onClick={handleLogout}>
          <p>Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default AvatarDropdown;
