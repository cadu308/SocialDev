import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperiencia = ({
  experiencia: { empresa, funcao, localizacao, atual, de, ate, descricao },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{empresa}</h3>
      <p>
        <strong>Período: </strong>
        <Moment format='DD/MM/YYYY'>{de}</Moment> -{' '}
        {!ate ? ' Atualmente' : <Moment format='DD/MM/YYYY'>{ate}</Moment>}
      </p>
      <p>
        <strong>Função: </strong> {funcao}
      </p>
      <p>
        <strong>Descrição: </strong> {descricao}
      </p>
    </div>
  );
};

ProfileExperiencia.propTypes = {
  experiencia: PropTypes.array.isRequired,
};

export default ProfileExperiencia;
