import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    empresa: '',
    website: '',
    localizacao: '',
    nivel: '',
    competencias: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    empresa,
    website,
    localizacao,
    nivel,
    competencias,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Crie Seu Perfil</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Vamos precisar de algumas informações
        para a criação do seu perfil
      </p>
      <small>* = campo obrigatório</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='nivel' value={nivel} onChange={(e) => onChange(e)}>
            <option value='0'>* Selecione Seu Nível Profissional</option>
            <option value='Desenvolvedor'>Desenvolvedor</option>
            <option value='Desenvolvedor Junior'>Desenvolvedor Júnior</option>
            <option value='Desenvolvedor Senior'>Desenvolvedor Senior</option>
            <option value='Gerente'>Gerente</option>
            <option value='Estudante'>Estudante</option>
            <option value='Professor'>Professor</option>
            <option value='Estagiário'>Estagiário</option>
            <option value='Outro'>Outro</option>
          </select>
          <small className='form-text'>
            Nos dê uma ideia de seu nível profissional
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Empresa'
            name='empresa'
            value={empresa}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Pode ser uma empresa sua ou na qual você trabalha
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Site'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Seu website ou da empresa que administra
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Localização'
            name='localizacao'
            value={localizacao}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Cidade & UF (ex: Rio de Janeiro, RJ)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Competências'
            name='competencias'
            value={competencias}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Por favor, utilize vírgulas para a separação (ex:
            HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Usuário do Github'
            name='githubusername'
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Caso queira que seja exibido seus repositórios atuais e um link de
            acesso do Github, inclua seu username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Uma pequena descrição do seu perfil'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Nos fale um pouco sobre você</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Adicione o Link de Suas Mídias Sociais
          </button>
          <span>Opicional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='URL do Twitter'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='URL do Facebook'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='URL do YouTube'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='URL do Linkedin'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='URL do Instagram'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Voltar
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
