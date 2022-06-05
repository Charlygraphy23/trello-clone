import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StoreType } from 'store';
import {
  getBoard,
  updateColumnsData,
  updateTaskAndColumnPosition
} from 'store/actions';
import { ColumnElementType } from 'store/reducers/column.reducer';
import AddList from './components/AddList';
import BoardCards from './components/Cards';
import './style.scss';

const BoardIndex = () => {
  const [showAddCard, setShowAddCard] = useState<ColumnElementType | null>();
  const { columns, columnOrder } = useSelector(
    (store: StoreType) => store.ColumReducer
  );
  const { data } = useSelector((store: StoreType) => store.BoardReducer);
  const taskList = useSelector((store: StoreType) => store.TaskReducer);
  const dispatch = useDispatch();
  const { id = '' } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    dispatch(getBoard({ boardId: id }));
  }, [dispatch, id]);

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

      console.log('Board', {
        destination,
        source,
        draggableId,
        type
      });

      if (!columns) return;

      const start = columns[source?.droppableId];
      const end = columns[destination?.droppableId];

      if (type === 'column') {
        const newOrder = Array.from(columnOrder);
        newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, draggableId);

        dispatch(
          updateTaskAndColumnPosition({
            listId: draggableId,
            order: destination.index,
            type,
            boardId: id,
            source,
            destination,
            draggableId
          })
        );

        return dispatch(
          updateColumnsData({
            columnOrder: newOrder
          })
        );
      }

      if (start === end) {
        const column = columns[source?.droppableId];
        const taskIds = [...column.taskIds];
        taskIds.splice(source.index, 1);
        taskIds.splice(destination.index, 0, draggableId);
        const newColumn = {
          ...column,
          taskIds
        };

        if (type === 'task') {
          dispatch(
            updateTaskAndColumnPosition({
              taskId: draggableId,
              listId: destination.droppableId,
              order: destination.index,
              type,
              boardId: id,
              source,
              destination,
              draggableId
            })
          );
        }

        return dispatch(
          updateColumnsData({
            columns: {
              ...columns,
              [column.listId]: newColumn
            }
          })
        );
      }

      const startTaskIds = start.taskIds ? [...start.taskIds] : [];
      const endTaskIds = end.taskIds ? [...end.taskIds] : [];

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

      if (type === 'task') {
        dispatch(
          updateTaskAndColumnPosition({
            taskId: draggableId,
            listId: destination.droppableId,
            order: destination.index,
            type,
            boardId: id,
            source,
            destination,
            draggableId
          })
        );
      }

      return dispatch(
        updateColumnsData({
          columns: {
            ...columns,
            [start.listId]: newStartColumn,
            [end.listId]: endTaskColumn
          }
        })
      );
    },
    [columnOrder, columns, dispatch, id]
  );

  return (
    <>
      <div
        className='board'
        style={{ backgroundColor: `${data?.backgroundColor}` }}
      >
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
                {columnOrder.map((columnId, index) => {
                  const column = columns ? columns[columnId] : null;
                  const tasks: any = column?.taskIds
                    ? column?.taskIds.map((taskId: string) => taskList[taskId])
                    : [];

                  return (
                    column?.listId && (
                      <BoardCards
                        index={index}
                        key={column?.listId}
                        column={column}
                        tasks={tasks}
                        setShowAddCard={setShowAddCard}
                        showAddCard={showAddCard?.listId === column?.listId}
                        boardId={id}
                      />
                    )
                  );
                })}

                {provided.placeholder}
                <AddList boardId={id} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default BoardIndex;
