import '../style/CommentView.css'
import PropTypes from 'prop-types';

CommentView.propTypes = {
  comment: PropTypes.object
}

export default function CommentView({ comment }){
  return(
    <>
      <div className='commentContainer'>
        <p className='commenter'>{comment.user.username}</p>
        <p className='commentDate'>{comment.content}</p>
        <p className='commentContent'>{comment.date}</p>
      </div>
    </>
  )
}