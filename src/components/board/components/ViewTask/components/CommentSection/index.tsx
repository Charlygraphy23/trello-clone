import React, { useCallback, useRef, useState } from 'react';
import UserComments from './components/UserComments';

const CommentSection = () => {
  const [comment, setComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
          <button type='button'>Save</button>
        </div>
      </div>

      <UserComments />
    </div>
  );
};

export default CommentSection;
