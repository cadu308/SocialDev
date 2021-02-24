import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    competencias,
    user: { nome },
  },
}) => {
  return (
    <div class='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 class='text-primary'>Biografia de {nome.trim().split(' ')[0]}</h2>
          <p>{bio}</p>
          <div class='line'></div>
        </Fragment>
      )}
      <h2 class='text-primary'>Competências</h2>
      <div class='skills'>
        {competencias.map((competencia, index) => (
          <div key={index} class='p-1'>
            <i class='fa fa-check'></i> {competencia}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
