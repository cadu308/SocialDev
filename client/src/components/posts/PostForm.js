import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [texto, setText] = useState('');
  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>Diga alguma coisa...</h3>
      </div>
      <form
        class='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ texto });
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
