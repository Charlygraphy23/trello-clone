import { getTitleName } from 'config/app';
import DropDown from 'core/DropDown';
import MemberSelection from 'core/MemberSelection';
import React from 'react';
import { TaskConstant } from 'store/reducers/task.reducer';

type Props = {
  task: TaskConstant;
};

const ViewTaskMemberSection = ({ task }: Props) => (
  <section className=' d-flex viewTaskMember'>
    <p className='viewTaskMember__title'> Members</p>

    <div className='d-flex align-items-center'>
      {task.members &&
        task.members.map((member) => (
          <div className='avatar__div' key={member._id}>
            {getTitleName(member?.firstName, member?.lastName)}
          </div>
        ))}

      <DropDown
        title='Members'
        buttonId='Members-add-dropdown-button'
        buttonText={<i className='bi bi-plus-lg' />}
        buttonClass='viewTaskMember__addMore'
      >
        <MemberSelection task={task} />
      </DropDown>
    </div>
  </section>
);

export default ViewTaskMemberSection;
