import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [texto, setText] = useState('');

  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Deixe um comentário </h3>
      </div>
      <form
        class='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { texto });
          setText('');
        }}
      >
        <textarea
          name='texto'
          cols='30'
          rows='5'
          value={texto}
          onChange={(e) => setText(e.target.value)}
          placeholder=''
          required
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Enviar' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
