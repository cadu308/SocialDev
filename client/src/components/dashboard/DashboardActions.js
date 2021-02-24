import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Editar Perfil
      </Link>
      <Link to='/add-experiencia' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> Adicionar Experiência
      </Link>
      <Link to='/add-educacao' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Adicionar
        Educação
      </Link>
    </div>
  );
};

export default DashboardActions;