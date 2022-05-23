import { PropagateLoader } from 'react-spinners';

const PageLoader = () => (
  <div
    className='d-flex justify-content-center align-items-center'
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'white',
      zIndex: 2000,
      pointerEvents: 'none'
    }}
  >
    <PropagateLoader color='black' loading size={10} />
  </div>
);

export default PageLoader;
