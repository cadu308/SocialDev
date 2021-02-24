import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { excluirExperiencia } from '../../actions/profile';

const Experiencia = ({ experiencia, excluirExperiencia }) => {
  const experiencias = experiencia.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.empresa}</td>
      <td className='hide-sm'>{exp.funcao}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{exp.de}</Moment> -{' '}
        {exp.ate === null ? (
          ' Agora'
        ) : (
          <Moment format='DD/MM/YYYY'>{exp.ate}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => excluirExperiencia(exp._id)}
          className='btn btn-danger'
        >
          Excluir
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experiências</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Empresa</th>
            <th className='hide-sm'>Função</th>
            <th className='hide-sm'>Período</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiencias}</tbody>
      </table>
    </Fragment>
  );
};

Experiencia.propTypes = {
  experiencia: PropTypes.array.isRequired,
  excluirExperiencia: PropTypes.func.isRequired,
};

export default connect(null, { excluirExperiencia })(Experiencia);
