import { getTitleName } from 'config/app';
import { TaskConstant } from 'store/reducers/task.reducer';

type Props = {
  task: TaskConstant;
};

const TaskMemberList = ({ task }: Props) => (
  <div className='taskMemberList'>
    {task?.members &&
      task?.members?.length > 0 &&
      task?.members?.map((member) => (
        <div key={member._id} className='avatar__div'>
          {getTitleName(member.firstName, member.lastName)}
        </div>
      ))}
  </div>
);

export default TaskMemberList;
