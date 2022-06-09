import { handleDragEvent } from 'lib/drag.lib';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'store';
import { ColumnElementType } from 'store/reducers/column.reducer';
import { TaskConstant } from 'store/reducers/task.reducer';
import DropDown from './DropDown';

type Props = {
  task: TaskConstant;
};

const MoveCardSection = ({ task }: Props) => {
  const dispatch = useDispatch();

  const { list } = useSelector((store: StoreType) => store.HomeReducer);
  const { data } = useSelector((store: StoreType) => store.BoardReducer);
  const { columns, columnOrder } = useSelector(
    (store: StoreType) => store.ColumReducer
  );

  const [selectedColumn, setSelectedColumn] =
    useState<ColumnElementType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const workspace = useMemo(
    () =>
      list.find(
        (workspaceData) => workspaceData._id.toString() === data?.workspace
      ),
    [data?.workspace, list]
  );

  const handleBoardClick = useCallback(
    (columnData: ColumnElementType, hide) => {
      if (!selectedColumn?.listId) return;

      const taskIds = columnData?.taskIds ?? [];
      // if task index is less than active list task length
      const taskIndex = taskIds.length > selectedIndex ? selectedIndex : 1;

      const payload: DropResult = {
        source: {
          droppableId: selectedColumn?.listId,
          index: task?.order ?? 0
        },
        destination: {
          droppableId: columnData.listId,
          index: taskIndex - 1
        },
        draggableId: task.taskId,
        reason: 'DROP',
        type: 'task',
        mode: 'FLUID'
      };

      handleDragEvent({
        payload,
        dispatch,
        boardId: columnData.boardId ?? '',
        columnOrder,
        columns
      });

      setSelectedIndex(taskIndex);
      setSelectedColumn(columns ? columns[columnData.listId] : columnData);
      hide();
    },
    [
      columnOrder,
      columns,
      dispatch,
      selectedColumn?.listId,
      selectedIndex,
      task?.order,
      task.taskId
    ]
  );

  const handleIndexClick = useCallback(
    (index: number, hide) => {
      if (!selectedColumn?.listId) return;

      const payload: DropResult = {
        source: {
          droppableId: selectedColumn?.listId,
          index: task?.order ?? 0
        },
        destination: {
          droppableId: selectedColumn?.listId,
          index: index - 1
        },
        draggableId: task.taskId,
        reason: 'DROP',
        type: 'task',
        mode: 'FLUID'
      };

      handleDragEvent({
        payload,
        dispatch,
        boardId: task.boardId ?? '',
        columnOrder,
        columns
      });

      const columnData = columns ? columns[task.listId] : null;

      setSelectedIndex(index);
      setSelectedColumn(columnData);

      hide();
    },
    [
      columnOrder,
      columns,
      dispatch,
      selectedColumn?.listId,
      task.boardId,
      task.listId,
      task?.order,
      task.taskId
    ]
  );

  console.log('filter', { selectedColumn });
  console.log('task', { task });

  useEffect(() => {
    if (columns) {
      setSelectedColumn(columns[task.listId]);
    }

    if (task && columns) {
      const order = columns[task.listId].taskIds.findIndex(
        (id) => id === task.taskId
      );
      setSelectedIndex(order + 1);
    }
  }, []);

  return (
    <div className='moveCardSection my-3'>
      <p className='moveCardSection__title'>Select Destination</p>

      <DropDown
        title='Select Destination'
        buttonId='select-destination-button'
        buttonClass='moveCardSection__select'
        className='moveCardSection__select'
        hideTitle
        buttonText={
          <div className='moveCardSectionSelect__title'>
            <p className='title'>Title</p>
            <p className='listName'>{workspace?.name} Workspace</p>
          </div>
        }
      >
        <div className='moveCardSectionSelect__body'>
          <p className='title'>{workspace?.name} Workspace</p>
          <div className='moveCardSectionSelect__list'>
            <p className='list__item active'>{data?.name}</p>
          </div>
        </div>
      </DropDown>

      <div className='d-flex align-items-center w-100'>
        <DropDown
          title='Select List'
          buttonId='select-destination-button'
          buttonClass='moveCardSection__select'
          className='moveCardSection__select'
          hideTitle
          style={{ flex: 1, marginRight: '10px' }}
          buttonText={
            <div className='moveCardSectionSelect__title'>
              <p className='title'>List</p>
              <p className='listName'>{selectedColumn?.title}</p>
            </div>
          }
          render={(onClose) => (
            <div className='moveCardSectionSelect__body'>
              {columns &&
                Object.values(columns).map((column) => (
                  <div
                    key={column.listId}
                    className='moveCardSectionSelect__list'
                    onClick={() => handleBoardClick(column, onClose)}
                  >
                    <p className='list__item'>{column.title}</p>
                  </div>
                ))}
            </div>
          )}
        />

        <DropDown
          title='Select Position'
          buttonId='select-destination-button'
          buttonClass='moveCardSection__select'
          className='moveCardSection__select'
          hideTitle
          style={{ minWidth: '80px' }}
          buttonText={
            <div className='moveCardSectionSelect__title'>
              <p className='title'>Position</p>
              <p className='listName'>{selectedIndex}</p>
            </div>
          }
          render={(onClose) => (
            <div className='moveCardSectionSelect__body'>
              {selectedColumn &&
                selectedColumn?.taskIds &&
                selectedColumn?.taskIds.map((tasks, i) => (
                  <div
                    key={tasks}
                    className='moveCardSectionSelect__list'
                    onClick={() => handleIndexClick(i + 1, onClose)}
                  >
                    <p className='list__item'>
                      {i + 1}{' '}
                      {selectedIndex - 1 === i && tasks === task.taskId
                        ? '(Current)'
                        : ''}
                    </p>
                  </div>
                ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default MoveCardSection;
