import initialData from 'data';
import { BoardType, ColumnType } from 'interfaces/board.interface';
import { useCallback, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import AddList from './components/AddList';
import BoardCards from './components/Cards';
import './style.scss';

const BoardIndex = () => {
  const [data, setData] = useState<BoardType>(initialData);
  const [showAddCard, setShowAddCard] = useState<ColumnType>();

  const onDragEnd = useCallback(
    (payload: DropResult) => {
      const { destination, source, draggableId, type } = payload;

      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      console.log({
        destination,
        source,
        draggableId,
        type
      });

      const start = data.columns[source?.droppableId];
      const end = data.columns[destination?.droppableId];

      if (type === 'column') {
        const newOrder = Array.from(data.columnOrder);
        newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, draggableId);

        return setData({
          ...data,
          columnOrder: newOrder
        });
      }

      if (start === end) {
        const column = data.columns[source?.droppableId];
        const taskIds = [...column.taskIds];
        taskIds.splice(source.index, 1);
        taskIds.splice(destination.index, 0, draggableId);
        const newColumn = {
          ...column,
          taskIds
        };
        return setData({
          ...data,
          columns: {
            ...data.columns,
            [column.id]: newColumn
          }
        });
      }

      const startTaskIds = [...start.taskIds];
      const endTaskIds = [...end.taskIds];

      startTaskIds.splice(source.index, 1);
      endTaskIds.splice(destination.index, 0, draggableId);

      const newStartColumn = {
        ...start,
        taskIds: startTaskIds
      };
      const endTaskColumn = {
        ...end,
        taskIds: endTaskIds
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [start.id]: newStartColumn,
          [end.id]: endTaskColumn
        }
      });
    },
    [data]
  );

  return (
    <div className='board'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId='all-column'
          type='column'
          direction='horizontal'
        >
          {(provided) => (
            <div
              className=' d-flex justify-content-start board__body'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.columnOrder.map((columnId, index) => {
                const column = data?.columns[columnId];
                const tasks: any = column?.taskIds.map(
                  (taskId) => data.tasks[taskId]
                );

                return (
                  column && (
                    <BoardCards
                      index={index}
                      key={column?.id}
                      column={column}
                      tasks={tasks}
                      setShowAddCard={setShowAddCard}
                      showAddCard={showAddCard?.id === column?.id}
                    />
                  )
                );
              })}

              <AddList />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BoardIndex;
