import { getTitleName } from 'config/app';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'store';

const LeftSubHeaderSection = () => {
  const { data } = useSelector((store: StoreType) => store.BoardReducer);
  const { members } = useSelector((store: StoreType) => store.MemberReducer);
  const { list } = useSelector((store: StoreType) => store.HomeReducer);
  const currentWorkSpace = useMemo(
    () => list.find((workspace) => workspace._id === data?.workspace),
    [data?.workspace, list]
  );

  return (
    <section className='left_sub_header'>
      <div className='white__card' style={{ marginRight: '10px' }}>
        <i className='bi bi-card-text' style={{ marginRight: '5px' }} />
        <p>Board</p>
      </div>

      <h3 className='board__name'>{data?.name}</h3>
      <div className='vr' />

      <div className='white__card'>{currentWorkSpace?.name} Workspace</div>
      <div className='vr' />

      <div className='memberList'>
        {members &&
          members.map((member) => (
            <div className='avatar__div'>
              {getTitleName(member.user.firstName, member.user.lastName)}
            </div>
          ))}
      </div>
    </section>
  );
};

export default LeftSubHeaderSection;
