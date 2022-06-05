import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TaskConstant } from 'store/reducers/task.reducer';
import TaskLabelChips from './Chips';
import TaskFooter from './TaskFooter';

type TaskBodyType = {
  task: TaskConstant;
  isDragging: boolean;
};

const TaskBody = ({ isDragging, task }: TaskBodyType) => {
  const history = useHistory();
  const location = useLocation();
  // const {};

  const handleClick = useCallback(() => {
    if (!task?.taskId) return;

    history.push({
      pathname: `/task/${task.taskId}`,
      state: { background: location }
    });
  }, [history, location, task.taskId]);

  return (
    <div
      className={isDragging ? 'taskList grab__task' : 'taskList'}
      onClick={handleClick}
    >
      {task.labels && task.labels.length > 0 && <TaskLabelChips task={task} />}
      <p>{task.content}</p>
      <TaskFooter />
    </div>
  );
};

export default TaskBody;
