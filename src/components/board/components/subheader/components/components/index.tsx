import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'store';
import ChangeBackground from './components/ChangeBackground';

type Props = {
  hide: () => void;
};

const MoreOption = ({ hide }: Props) => {
  const [route, setRoute] = useState('');
  const { data: boardData } = useSelector(
    (store: StoreType) => store.BoardReducer
  );
  const generateTitle = useCallback(() => {
    switch (route) {
      case 'board':
        return 'Demo';
      case 'background':
        return 'Colors';
      case 'labels':
        return 'Labels';
      default:
        return 'Menu';
    }
  }, [route]);

  return (
    <section style={{ flex: 1, overflow: 'auto' }}>
      <div className='head'>
        {route && (
          <i className='bi bi-chevron-left' onClick={() => setRoute('')} />
        )}
        <span>{generateTitle()}</span>
        <i className='bi bi-x-lg ' onClick={hide} />
      </div>

      <div style={{ position: 'relative' }}>
        <div className='info'>
          <div className='info__menu' onClick={() => setRoute('board')}>
            <i className='bi bi-kanban-fill ' />
            <p>About this board</p>
          </div>

          <div className='info__menu' onClick={() => setRoute('background')}>
            <div
              className='icon'
              style={{ backgroundColor: boardData?.backgroundColor }}
            />
            <p>Change Background</p>
          </div>

          <div className='info__menu' onClick={() => setRoute('labels')}>
            <i className='bi bi-tags' />
            <p>Labels</p>
          </div>
        </div>

        <div
          className={classNames('panel', {
            show:
              route === 'board' || route === 'background' || route === 'labels'
          })}
        >
          <div className='panel__body'>
            {route === 'board' && <></>}
            {route === 'background' && (
              <ChangeBackground boardData={boardData} />
            )}
            {route === 'labels' && <></>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreOption;
