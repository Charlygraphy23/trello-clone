import { Draggable } from 'react-beautiful-dnd';
import { TaskConstant } from 'store/reducers/task.reducer';
import TaskBody from './components/TaskBody';
import './style.scss';

type TaskTypeWrap = {
  task: TaskConstant;
  index: number;
};

const TasksList = ({ task, index }: TaskTypeWrap) => (
  <Draggable draggableId={task.taskId} index={index}>
    {(provided, snapshot) => (
      <div
        id={task.taskId}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        <TaskBody isDragging={snapshot.isDragging} task={task} />
      </div>
    )}
  </Draggable>
);

export default TasksList;
