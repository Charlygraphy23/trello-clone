import { Link } from 'react-router-dom';
import InviteImage from '../../assets/undraw_energizer.svg';
import './style.scss';

const InvitePage = () => (
  <div className='invite'>
    <div className='invite__body'>
      <div className='invite__info'>
        <h3>
          Invitation From <span>Friend!</span>
        </h3>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
          quibusdam? Dolorem quis odit omnis modi voluptate voluptates nisi
          maiores praesentium illo alias perferendis animi dolor exercitationem
          perspiciatis iusto, pariatur nihil.
        </p>

        <div className='buttonGroup'>
          <button type='button' className='mr-4 accept'>
            Accept
          </button>
          <Link to='/'>
            <button type='button' className='back'>
              Back to Login
            </button>
          </Link>
        </div>
      </div>

      <img src={InviteImage} alt='Invite' />
    </div>
  </div>
);

export default InvitePage;
