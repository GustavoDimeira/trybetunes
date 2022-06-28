import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingMsg from '../components/LoadingMsg';

class Profile extends React.Component {
  state = {
    nome: '',
    email: '',
    description: '',
    image: '',
    loading: false,
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const infos = await getUser();
    this.setState({
      nome: infos.name,
      email: infos.email,
      description: infos.description,
      image: infos.image });
    this.setState({ loading: false });
  }

  render() {
    const { nome, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <LoadingMsg /> }
        <div>
          <p>{nome}</p>
          <p>{email}</p>
          <p>{description}</p>
          <img data-testid="profile-image" src={ image } alt="NotFound" />
        </div>
        <Link to="profile/edit">
          Editar perfil
        </Link>
      </div>
    );
  }
}

export default Profile;
