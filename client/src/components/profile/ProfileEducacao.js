import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducacao = ({
  educacao: { escola, nivel, localdeestudo, atual, de, ate, descricao },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{escola}</h3>
      <p>
        <Moment format='DD/MM/YYYY'>{de}</Moment> -{' '}
        {!ate ? ' Agora' : <Moment format='DD/MM/YYYY'>{ate}</Moment>}
      </p>
      <p>
        <strong>Nível: </strong> {nivel}
      </p>
      <p>
        <strong>Descrição: </strong> {descricao}
      </p>
    </div>
  );
};

ProfileEducacao.propTypes = {
  experiencia: PropTypes.array.isRequired,
};

export default ProfileEducacao;
