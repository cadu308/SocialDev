import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, nome, avatar },
    nivel,
    empresa,
    localizacao,
    competencias,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{nome}</h2>
        <p>
          {nivel} {empresa && <span>em {empresa}</span>}
        </p>
        <p className='my-1'>{localizacao && <span>{localizacao}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          Ver Perfil
        </Link>
      </div>
      <ul>
        {competencias.slice(0, 4).map((competencias, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {competencias}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
