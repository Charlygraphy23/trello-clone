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
  setShowAddCard,
  boardId
}: BoardCardType) => (
  <Draggable draggableId={column?.listId ?? ''} index={index}>
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
          <Droppable droppableId={column?.listId ?? ''} type='task'>
            {(_provided) => (
              <div
                className='boardCards__body'
                ref={_provided.innerRef}
                {..._provided.droppableProps}
              >
                <div>
                  {tasks &&
                    tasks.length > 0 &&
                    tasks.map((task, _index) => (
                      <TasksList
                        key={task?.taskId}
                        task={task}
                        index={_index}
                      />
                    ))}

                  {_provided.placeholder}

                  {showAddCard ? (
                    <AddTask
                      setShowAddCard={setShowAddCard}
                      columnId={column?.listId}
                      boardId={boardId}
                    />
                  ) : (
                    <AddTaskButton
                      setShowAddCard={setShowAddCard}
                      column={column}
                    />
                  )}
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
