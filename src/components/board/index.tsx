import { handleDragEvent } from 'lib/drag.lib';
import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StoreType } from 'store';
import { getBoard } from 'store/actions';
import { ColumnElementType } from 'store/reducers/column.reducer';
import AddList from './components/AddList';
import BoardCards from './components/Cards';
import SubHeader from './components/subheader';
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
      handleDragEvent({
        payload,
        dispatch,
        boardId: id ?? '',
        columnOrder,
        columns
      });
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
              <>
                <SubHeader />
                <div
                  className=' d-flex justify-content-start board__body'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {columnOrder.map((columnId, index) => {
                    const column = columns ? columns[columnId] : null;
                    const tasks: any = column?.taskIds
                      ? column?.taskIds.map(
                          (taskId: string) => taskList[taskId]
                        )
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
              </>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default BoardIndex;
