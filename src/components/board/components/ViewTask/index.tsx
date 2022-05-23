/* eslint-disable quotes */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import CheckList from './components/CardList';
import CardOptions from './components/CardOptions';
import CommentSection from './components/CommentSection';
import DescriptionSection from './components/DescriptionSection';
import TaskLabelsShow from './components/TaskLabelsShow';
import './style.scss';

const ViewTask = () => {
  const history = useHistory();
  const [readOnlyTitle, setReadOnlyTitle] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
          className='viewTask__head'
          readOnly={readOnlyTitle}
          onChange={handleHeadChange}
          onFocusCapture={() => setReadOnlyTitle(false)}
          onBlurCapture={() => setReadOnlyTitle(true)}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        </textarea>

        <div className='close__icon'>
          <i className='bi bi-x-lg' onClick={handleClose} />
        </div>

        <div className='row m-0'>
          <div className='col-9'>
            <TaskLabelsShow />

            <DescriptionSection />

            <CheckList />

            <CommentSection />
          </div>

          <div className='col-3 p-0 py-2'>
            <CardOptions />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ViewTask;
