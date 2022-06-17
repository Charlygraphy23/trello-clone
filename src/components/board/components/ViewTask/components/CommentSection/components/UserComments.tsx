/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { getTitleName } from 'config/app';
import moment from 'moment';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentAction } from 'store/actions';
import { TaskConstant } from 'store/reducers/task.reducer';

type Props = {
  task: TaskConstant;
};

const UserComments = ({ task }: Props) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (commentId: string) => {
      deleteCommentAction({
        dispatch,
        data: {
          taskId: task?.taskId ?? '',
          commentId
        }
      });
    },
    [dispatch, task?.taskId]
  );

  return (
    <>
      {task?.comments?.map((comment, i) => (
        <div className='userComments'>
          <div className='avatar__div'>
            {getTitleName(comment.user.firstName, comment.user.lastName)}
          </div>
          <div className='userComments__body'>
            <p className='userComments__title'>
              <span>{`${comment.user.firstName} ${comment.user.lastName}`}</span>
              <span>{moment(comment.time).fromNow()}</span>
            </p>

            <div className='userComments__text'>{comment.message}</div>
            <div className='options'>
              <p onClick={() => handleDelete(comment?.commentId ?? '')}>
                Delete
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserComments;
