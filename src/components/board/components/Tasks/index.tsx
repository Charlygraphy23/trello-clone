import { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskConstant } from 'store/reducers/task.reducer';
import TaskBody from './components/TaskBody';
import TaskOptions from './components/TaskOptions';
import './style.scss';

type TaskTypeWrap = {
  task: TaskConstant;
  index: number;
};

const TasksList = ({ task, index }: TaskTypeWrap) => {
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [reactPosition, setReactPosition] = useState<DOMRect>({} as DOMRect);

  const toggleBackdrop = useCallback(() => {
    setShowTaskMenu((prevState) => !prevState);
  }, []);

  return (
    <>
      <Draggable draggableId={task?.taskId} index={index}>
        {(provided, snapshot) => (
          <div
            id={task?.taskId}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              position: 'relative'
            }}
          >
            <TaskBody
              isDragging={snapshot.isDragging}
              task={task}
              toggleBackdrop={toggleBackdrop}
              show={showTaskMenu}
              setReactPosition={setReactPosition}
            />
          </div>
        )}
      </Draggable>

      {showTaskMenu && (
        <div className='task__backdrop' onClick={toggleBackdrop} />
      )}

      {showTaskMenu && (
        <TaskOptions
          toggleBackdrop={toggleBackdrop}
          position={reactPosition}
          task={task}
        />
      )}
    </>
  );
};

export default TasksList;
