/* eslint-disable quotes */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import { StoreType } from 'store';
import CheckList from './components/CardList';
import CardOptions from './components/CardOptions';
import CommentSection from './components/CommentSection';
import DescriptionSection from './components/DescriptionSection';
import ViewTaskMemberSection from './components/MemberSection';
import TaskLabelsShow from './components/TaskLabelsShow';
import './style.scss';

const ViewTask = () => {
  const history = useHistory();
  const [readOnlyTitle, setReadOnlyTitle] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { taskId } = useParams<{ taskId: string }>();
  const tasks = useSelector((store: StoreType) => store.TaskReducer);
  const task = tasks[taskId];

  const handleTextareaHeight = useCallback(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, []);

  const handleToggle = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleHeadChange = useCallback(() => {
    // @ts-ignore
    handleTextareaHeight();
  }, [handleTextareaHeight]);

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

  useEffect(() => {
    handleTextareaHeight();
  }, [handleTextareaHeight]);

  return (
    <Modal isOpen toggle={handleToggle} centered className='viewTask' size='lg'>
      <ModalBody>
        <textarea
          ref={handleRef}
          value={task.content}
          className='viewTask__head'
          readOnly={readOnlyTitle}
          onChange={handleHeadChange}
          onFocusCapture={() => setReadOnlyTitle(false)}
          onBlurCapture={() => setReadOnlyTitle(true)}
        >
          {task.content}
        </textarea>

        <div className='close__icon'>
          <i className='bi bi-x-lg' onClick={handleClose} />
        </div>

        <div className='row m-0'>
          <div className='col-9'>
            {task.labels && task.labels.length > 0 && (
              <TaskLabelsShow task={task} />
            )}

            {task.members && task.members?.length > 0 && (
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

            <CommentSection />
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
