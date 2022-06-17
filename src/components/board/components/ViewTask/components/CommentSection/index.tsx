import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { StoreType } from 'store';
import { addMyCommentAction, loadComments } from 'store/actions';
import { TaskConstant } from 'store/reducers/task.reducer';
import { v4 } from 'uuid';
import UserComments from './components/UserComments';

type Props = {
  task: TaskConstant;
};

const CommentSection = ({ task }: Props) => {
  const [comment, setComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const { firstName, lastName, profileImage } = useSelector(
    (store: StoreType) => store.ProfileReducer
  );
  const { data } = useSelector((store: StoreType) => store.BoardReducer);
  const { loading } = useSelector(
    (store: StoreType) => store.LoadCommentReducer
  );

  const handleTextareaHeight = useCallback((height?) => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `${
      height ?? textareaRef.current.scrollHeight
    }px`;
  }, []);

  const handleRef = useCallback(
    (ref: HTMLTextAreaElement) => {
      // @ts-ignore
      textareaRef.current = ref;
      handleTextareaHeight();
    },
    [handleTextareaHeight]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!e.target.value) {
        handleTextareaHeight(10);
      }

      setComment(e.target.value);
      handleTextareaHeight();
    },
    [handleTextareaHeight]
  );

  const handleSave = useCallback(() => {
    if (!comment) return;

    addMyCommentAction({
      dispatch,
      data: {
        firstName,
        lastName,
        profileImage,
        taskId: task?.taskId ?? '',
        message: comment,
        commentId: v4()
      }
    });

    handleTextareaHeight();

    setComment('');
  }, [
    comment,
    dispatch,
    firstName,
    handleTextareaHeight,
    lastName,
    profileImage,
    task?.taskId
  ]);

  useEffect(() => {
    dispatch(loadComments({ taskId: task?.taskId ?? '' }));
  }, [dispatch, task.taskId]);

  return (
    <div className='commentSection'>
      <div className='d-flex text-aligns-center justify-content-between'>
        <p className='commentSection__title d-flex text-aligns-center'>
          Activity
        </p>

        <button type='button' className='commentSection__showDetails'>
          Show Details
        </button>
      </div>

      <div className='commentSection__comment'>
        <div className='avatar__div'>DB</div>

        <div className='textarea__wrapper'>
          <textarea
            ref={handleRef}
            placeholder='Write a comment'
            value={comment}
            onChange={handleChange}
          />
          <button type='button' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      {loading ? (
        <div className='d-flex justify-content-center align-items-center my-5'>
          <PropagateLoader color={data?.backgroundColor} loading size={5} />
        </div>
      ) : (
        <UserComments task={task} />
      )}
    </div>
  );
};

export default CommentSection;
