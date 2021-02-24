import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
} from './types';

//RESTAGA O PERFIL DO USUÁRIO ATUAL
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//RESGATA TODOS OS PERFIS
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//RESGATA PERFIL POR ID
export const getProfileById = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//RESGATA OS REPOSITÓRIOS DO GITHUB
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//CRIA OU ATUALIZA O PERFIL
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Perfil Atualizado!' : 'Perfil Criado!', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADICIONAR EXPERIÊNCIA
export const addExperiencia = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experiencia', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experiência Adicionada!', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADICIONAR EDUCAÇÃO
export const addEducacao = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/educacao', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Educação Adicionada!', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// EXCLUIR EXPERIENCIA
export const excluirExperiencia = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experiencia/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experiência removida!', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// EXCLUIR EDUCAÇÃO
export const excluirEducacao = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/educacao/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Formação acadêmica removida!', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// EXCLUIR CONTA E PERFIL
export const excluirConta = () => async (dispatch) => {
  if (window.confirm('Tem certeza que deseja excluir sua conta?')) {
    try {
      const res = await axios.delete('/api/profile/');

      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: DELETE_ACCOUNT,
      });

      dispatch(setAlert('Sua conta foi removida!'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
