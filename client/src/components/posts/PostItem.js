import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, texto, nome, avatar, user, likes, comentarios, data },
  showActions,
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img class='round-img' src={avatar} alt='' />
        <h4>{nome}</h4>
      </Link>
    </div>
    <div>
      <p class='my-1'>{texto}</p>
      <p class='post-date'>
        Posted on <Moment format='DD/MM/YYYY'>{data}</Moment>
      </p>
      {showActions && (
        <Fragment>
          <button
            onClick={(e) => addLike(_id)}
            type='button'
            class='btn btn-light'
          >
            <i class='fas fa-thumbs-up'></i>{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={(e) => removeLike(_id)}
            type='button'
            class='btn btn-light'
          >
            <i class='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${_id}`} class='btn btn-primary'>
            Comentários{' '}
            {comentarios.length > 0 && (
              <span class='comment-count'>{comentarios.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type='button'
              class='btn btn-danger'
            >
              <i class='fas fa-times'></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
