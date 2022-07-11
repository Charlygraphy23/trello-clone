/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { addDescriptionToTask } from 'api';
import socketEvents from 'hooks/socketEvents';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import { StoreType } from 'store';
import { addCheckListGroupAction, updateTaskInfo } from 'store/actions';
import CheckList from './components/CardList';
import CardOptions from './components/CardOptions';
import CommentSection from './components/CommentSection';
import DescriptionSection from './components/DescriptionSection';
import ViewTaskMemberSection from './components/MemberSection';
import TaskLabelsShow from './components/TaskLabelsShow';
import './style.scss';

const ViewTask = () => {
  const { socket, userProfile } = socketEvents();
  const history = useHistory();
  const [readOnlyTitle, setReadOnlyTitle] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { taskId } = useParams<{ taskId: string }>();
  const tasks = useSelector((store: StoreType) => store.TaskReducer);
  const task = useMemo(() => tasks[taskId], [taskId, tasks]);
  const dispatch = useDispatch();
  const [content, setContent] = useState(task?.content ?? '');

  const handleTextareaHeight = useCallback((empty?: boolean) => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `${empty ? 48 : textareaRef.current.scrollHeight
      }px`;
  }, []);

  const handleToggle = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleHeadChange = useCallback(
    (e) => {

      const _val = e.target.value;

      if (!_val) handleTextareaHeight(true);
      else handleTextareaHeight();


      setContent(_val);
    },
    [handleTextareaHeight]
  );

  const handleRef = useCallback(
    (ref: HTMLTextAreaElement) => {
      // @ts-ignore
      textareaRef.current = ref;
      handleTextareaHeight();
    },
    [handleTextareaHeight]
  );

  const handleClose = useCallback(() => {
    handleToggle();
  }, [handleToggle]);

  const handleOnBlur = useCallback(() => {
    setReadOnlyTitle(true);

    if (content === task?.content) return;

    dispatch(
      updateTaskInfo({
        taskId: task.taskId,
        data: {
          content
        }
      })
    );

    addDescriptionToTask({
      taskId: task.taskId,
      data: {
        content
      },
      boardId: task.boardId
    });
  }, [content, dispatch, task?.boardId, task?.content, task?.taskId]);

  useEffect(() => {
    handleTextareaHeight();
  }, [handleTextareaHeight]);

  useEffect(() => {

    if (!socket.connected) return;

    socket.off('update-task-info').on('update-task-info', (_data: any) => {
      const { userId } = _data;

      // eslint-disable-next-line no-useless-return
      if (userProfile._id === userId) return;

      dispatch(
        updateTaskInfo({
          taskId: task.taskId,
          data: _data?.data
        })
      );
    });

    socket.off('add-checklist-group').on('add-checklist-group', (_data: any) => {
      const { boardId, userId, title, checkListGroupId } = _data;

      // eslint-disable-next-line no-useless-return
      if (userProfile._id === userId) return;

      addCheckListGroupAction({
        dispatch,
        data: {
          name: title,
          checkListGroupId,
          taskId: _data.taskId,
          boardId,
          avoidApiCall: true
        }
      });
    });
  }, [dispatch, socket, task?.taskId, userProfile?._id]);

  useEffect(() => {
    handleTextareaHeight();
  }, [handleTextareaHeight, task?.content]);

  return (
    <Modal isOpen toggle={handleToggle} centered className='viewTask' size='lg'>
      <ModalBody>
        <textarea
          ref={handleRef}
          value={readOnlyTitle ? task?.content : content}
          className='viewTask__head py-2'
          readOnly={readOnlyTitle}
          onChange={handleHeadChange}
          onFocusCapture={() => {
            setReadOnlyTitle(false);
            setContent(task?.content);
          }}
          onBlurCapture={handleOnBlur}
        />

        <div className='close__icon'>
          <i className='bi bi-x-lg' onClick={handleClose} />
        </div>

        <div className='row m-0'>
          <div className='col-9'>
            {task?.labels && task.labels.length > 0 && (
              <TaskLabelsShow task={task} />
            )}

            {task?.members && task.members?.length > 0 && (
              <ViewTaskMemberSection task={task} />
            )}

            <DescriptionSection task={task} />

            {task?.checkListGroups &&
              task.checkListGroups.length > 0 &&
              task.checkListGroups.map((checkListGroup) => (
                <CheckList
                  key={checkListGroup.checkListGroupId}
                  checkListGroup={checkListGroup}
                />
              ))}

            <CommentSection task={task} />
          </div>

          <div className='col-3 p-0 py-2'>
            <CardOptions task={task} />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewTask;
