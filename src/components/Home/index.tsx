import FooterSvg from 'components/FooterSvg';
import ComponentLoader from 'components/Loader/ComponentLoader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'store';
import { authLoad, homeLoad } from 'store/actions';
import EmptyHome from './components/EmptyHome';
import HomeBody from './components/HomeBody';
import './style.scss';

const Home = () => {
  const { list, loading } = useSelector(
    (store: StoreType) => store.HomeReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeLoad());
    dispatch(authLoad({}));
  }, [dispatch]);

  return (
    <section className='home'>
      <div className='container'>
        {loading && <ComponentLoader />}

        {list.length <= 0 && !loading ? (
          <EmptyHome />
        ) : (
          <HomeBody list={list} />
        )}
      </div>
      <FooterSvg />
    </section>
  );
};

export default Home;
