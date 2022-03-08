/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TaskType } from 'interfaces/board';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TaskLabelChips from './Chips';
import TaskFooter from './TaskFooter';

type TaskBodyType = {
  task: TaskType;
  isDragging: boolean;
};

const TaskBody = ({ isDragging, task }: TaskBodyType) => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = useCallback(() => {
    history.push({ pathname: '/data', state: { background: location } });
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={isDragging ? 'taskList grab__task' : 'taskList'}
      onClick={handleClick}
    >
      <TaskLabelChips />
      <p>{task.content}</p>
      <TaskFooter />
    </div>
  );
};

export default TaskBody;
