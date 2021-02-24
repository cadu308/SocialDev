import React, { forwardRef, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperiencia from './ProfileExperiencia';
import ProfileEducacao from './ProfileEducacao';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Voltar
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Editar Perfil
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experência</h2>
              {profile.experiencia.length > 0 ? (
                <Fragment>
                  {profile.experiencia.map((experiencia) => (
                    <ProfileExperiencia
                      key={experiencia._id}
                      experiencia={experiencia}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>Não há registros de experiências.</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Formação Acadêmica</h2>
              {profile.educacao.length > 0 ? (
                <Fragment>
                  {profile.educacao.map((educacao) => (
                    <ProfileEducacao key={educacao._id} educacao={educacao} />
                  ))}
                </Fragment>
              ) : (
                <h4>Não há registros de formação acadêmica.</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
