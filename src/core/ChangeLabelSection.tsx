/* eslint-disable react/no-array-index-key */
import { LABEL_COLORS } from 'config/app';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLabelBatch } from 'store/actions';
import { v4 } from 'uuid';

type ChangeLabelSectionType = {
  create?: boolean;
  boardId: string;
  hide?: () => void;
};

const ChangeLabelSection = ({
  create,
  boardId,
  hide
}: ChangeLabelSectionType) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleCreate = useCallback(async () => {
    if (!name || !color || !boardId) return;

    const id = v4();
    if (hide) hide();
    await addLabelBatch({
      name,
      backgroundColor: color,
      dispatch,
      labelId: id,
      boardId
    });
  }, [color, dispatch, hide, name, boardId]);

  useEffect(
    () => () => {
      setName('');
      setColor('');
    },
    []
  );

  return (
    <div className='changeLabelSection my-3'>
      <p className='changeLabelSection__title'>Name</p>
      <input
        type='text'
        className='mb-3'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p className='changeLabelSection__title'>Select a color</p>
      <div className=' changeLabelSection__body'>
        {LABEL_COLORS.map((colorCode: string, i: number) => (
          <div
            key={i}
            className='color__container'
            style={{ background: `${colorCode}` }}
            onClick={() => setColor(colorCode)}
          >
            {color === colorCode && <i className='bi bi-check2' />}
          </div>
        ))}
      </div>

      {!create && (
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <button type='button' className='bg__primary text-white'>
            Save
          </button>

          <button type='button' className='bg__danger text-white'>
            Delete
          </button>
        </div>
      )}

      {create && (
        <div className='d-flex align-items-center mt-3'>
          <button
            type='button'
            className='bg__primary text-white'
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

ChangeLabelSection.defaultProps = {
  create: false
};

export default ChangeLabelSection;
