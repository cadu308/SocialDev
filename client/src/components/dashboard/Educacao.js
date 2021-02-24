import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { excluirEducacao } from '../../actions/profile';

const Educacao = ({ educacao, excluirEducacao }) => {
  const educacoes = educacao.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.escola}</td>
      <td className='hide-sm'>{edu.nivel}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{edu.de}</Moment> -{' '}
        {edu.ate === null ? (
          ' Agora'
        ) : (
          <Moment format='DD/MM/YYYY'>{edu.ate}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => excluirEducacao(edu._id)}
          className='btn btn-danger'
        >
          Excluir
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Formação Acadêmica</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Escola</th>
            <th className='hide-sm'>Nível</th>
            <th className='hide-sm'>Período</th>
            <th />
          </tr>
        </thead>
        <tbody>{educacoes}</tbody>
      </table>
    </Fragment>
  );
};

Educacao.propTypes = {
  educacao: PropTypes.array.isRequired,
  excluirEducacao: PropTypes.func.isRequired,
};

export default connect(null, { excluirEducacao })(Educacao);
