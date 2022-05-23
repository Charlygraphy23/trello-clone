/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BoardCardType } from 'interfaces/board.interface';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TasksList from '../Tasks';
import AddTask from './components/AddTask';
import AddTaskButton from './components/AddTaskButton';
import './style.scss';

const BoardCards = ({
  index,
  column,
  tasks,
  showAddCard,
  setShowAddCard
}: BoardCardType) => (
  <Draggable draggableId={column?.id ?? ''} index={index}>
    {(provided) => (
      <>
        <section
          className='boardCards'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ maxHeight: '100%', ...provided.draggableProps.style }}
        >
          <div className='d-flex justify-content-between title'>
            <h5>{column?.title}</h5>

            <div />
          </div>
          <Droppable droppableId={column?.id ?? ''} type='task'>
            {(_provided) => (
              <div
                className='boardCards__body'
                ref={_provided.innerRef}
                {..._provided.droppableProps}
              >
                <div>
                  {tasks.map((task, _index) => (
                    <TasksList key={task.id} task={task} index={_index} />
                  ))}

                  {showAddCard ? (
                    <AddTask setShowAddCard={setShowAddCard} />
                  ) : (
                    <AddTaskButton
                      setShowAddCard={setShowAddCard}
                      column={column}
                    />
                  )}

                  {_provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </section>
      </>
    )}
  </Draggable>
);

export default BoardCards;
