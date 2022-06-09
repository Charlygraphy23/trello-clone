import { addDescriptionToTask } from 'api';
import TextAreaCombo from 'core/TextAreaCombo';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskInfo } from 'store/actions';
import { TaskConstant } from 'store/reducers/task.reducer';

type Props = {
  task: TaskConstant;
};

const DescriptionSection = ({ task }: Props) => {
  const TextAreaComboIds = useMemo(
    () => ({
      textarea: 'DescriptionSection_text',
      submitButton: 'DescriptionSection_submit'
    }),
    []
  );

  const [readOnly, setReadOnly] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const handleFocus = useCallback(() => {
    setReadOnly(false);
  }, []);

  const handleClick = useCallback(async () => {
    if (!textareaRef.current?.value) return;

    dispatch(
      updateTaskInfo({
        taskId: task.taskId,
        data: {
          description: textareaRef.current?.value
        }
      })
    );

    setReadOnly(true);

    await addDescriptionToTask({
      taskId: task.taskId,
      data: {
        description: textareaRef.current?.value
      }
    });
  }, [dispatch, task]);

  const handleEvent = useCallback(
    (e) => {
      const hasId = [
        TextAreaComboIds.submitButton,
        TextAreaComboIds.textarea
      ].includes(e.target?.id);
      setReadOnly(!hasId);
    },
    [TextAreaComboIds.submitButton, TextAreaComboIds.textarea]
  );

  useLayoutEffect(() => {
    document.addEventListener('click', handleEvent, true);

    return () => {
      document.removeEventListener('click', handleEvent, true);
    };
  }, [handleEvent]);

  return (
    <div className='descriptionSection'>
      <p className='descriptionSection__title'>
        <i className='bi bi-justify-left ' style={{ marginRight: '10px' }} />
        <span style={{ marginRight: '10px' }}>Description</span>

        {task?.description && (
          <button type='button' onClick={() => setReadOnly(false)}>
            Edit
          </button>
        )}
      </p>

      <TextAreaCombo
        ref={textareaRef}
        readOnly={readOnly}
        className='descriptionSection__textarea mb-2'
        placeholder='Add a more detailed description…'
        buttonText='Save'
        onFocusCapture={handleFocus}
        onSubmit={handleClick}
        textAreaId={TextAreaComboIds.textarea}
        submitButtonId={TextAreaComboIds.submitButton}
        value={task.description}
      />
    </div>
  );
};

export default DescriptionSection;
