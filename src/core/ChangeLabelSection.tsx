/* eslint-disable react/no-array-index-key */
import { LABEL_COLORS } from 'config/app';

type ChangeLabelSectionType = {
  create?: boolean;
};

const ChangeLabelSection = ({ create }: ChangeLabelSectionType) => (
  <div className='changeLabelSection my-3'>
    <p className='changeLabelSection__title'>Name</p>
    <input type='text' className='mb-3' />

    <p className='changeLabelSection__title'>Select a color</p>
    <div className=' changeLabelSection__body'>
      {LABEL_COLORS.map((colorCode: string, i: number) => (
        <div
          key={i}
          className='color__container'
          style={{ background: `${colorCode}` }}
        >
          <i className='bi bi-check2' />
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
        <button type='button' className='bg__primary text-white'>
          Create
        </button>
      </div>
    )}
  </div>
);

ChangeLabelSection.defaultProps = {
  create: false
};

export default ChangeLabelSection;
