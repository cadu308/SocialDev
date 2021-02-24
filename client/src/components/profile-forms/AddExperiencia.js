import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperiencia } from '../../actions/profile';

const AddExperiencia = ({ addExperiencia, history }) => {
  const [formData, setFormData] = useState({
    empresa: '',
    funcao: '',
    localizacao: '',
    de: '',
    ate: '',
    atual: false,
    descricao: '',
  });

  const [toDateDisabled, toggledDisabled] = useState(false);

  const { empresa, funcao, localizacao, de, ate, atual, descricao } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperiencia(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Adicione Uma Experiência</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Adicione sua experiência
        profissional como desenvolvedor que você teve no passado
      </p>
      <small>* = campo obrigatório</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Função'
            name='funcao'
            value={funcao}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Empresa'
            name='empresa'
            value={empresa}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Localização'
            name='localizacao'
            value={localizacao}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Data Inicial</h4>
          <input
            type='date'
            name='de'
            value={de}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='atual'
              checked={atual}
              value={atual}
              onChange={(e) => {
                setFormData({ ...formData, atual: !atual });
                toggledDisabled(!toDateDisabled);
              }}
            />{' '}
            Atual
          </p>
        </div>
        <div className='form-group'>
          <h4>Data Final</h4>
          <input
            type='date'
            name='ate'
            value={ate}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='descricao'
            cols='30'
            rows='5'
            placeholder='Descrição'
            value={descricao}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Voltar
        </Link>
      </form>
    </Fragment>
  );
};

AddExperiencia.propTypes = {
  addExperiencia: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addExperiencia })(
  withRouter(AddExperiencia)
);
