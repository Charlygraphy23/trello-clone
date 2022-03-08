import { TaskType } from 'interfaces/board';
import { Draggable } from 'react-beautiful-dnd';
import TaskBody from './components/TaskBody';
import './style.scss';

type TaskTypeWrap = {
  task: TaskType;
  index: number;
};

const TasksList = ({ task, index }: TaskTypeWrap) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <div
        id={task.id}
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
