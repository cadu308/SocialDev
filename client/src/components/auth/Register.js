import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    senha2: '',
  });

  const { nome, email, senha, senha2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (senha !== senha2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ nome, email, senha });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Registrar</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Crie sua conta
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nome'
            name='nome'
            value={nome}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Este site utiliza o Gravatar como plataforma universal de imagem de
            perfil. Utilize um e-mail gravatar.
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Senha'
            name='senha'
            value={senha}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirme a Senha'
            name='senha2'
            value={senha2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Registrar' />
      </form>
      <p className='my-1'>
        Já possui uma conta? <Link to='/login'>Acesse</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
