import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LoadingMsg from '../components/LoadingMsg';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    updateUserInfo: false,
    redirect: false,
    name: '',
    email: '',
    description: '',
    image: '',
  }

  componentWillUnmount = () => {
    this.setState({
      loading: false,
      redirect: false,
      name: '',
      email: '',
      description: '',
      image: '',
    });
  }

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
    });
  }

  componentDidUpdate = () => {
    const { updateUserInfo, name, email, description, image } = this.state;
    if (updateUserInfo) {
      this.newUserInfo({ name, email, description, image });
      this.mudar();
    }
  }

  mudar = () => {
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  isEmpty = () => {
    const { name, email, description, image } = this.state;
    return !(name && email && image && description);
  }

  main = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  newUserInfo = async (user) => {
    await updateUser(user);
    this.setState({
      updateUserInfo: false,
    });
  }

  save = async () => {
    this.setState({ updateUserInfo: true, loading: true });
  }

  render() {
    const { loading, redirect, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              data-testid="edit-input-name"
              value={ name }
              onChange={ this.main }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              data-testid="edit-input-email"
              value={ email }
              onChange={ this.main }
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              type="text"
              name="description"
              data-testid="edit-input-description"
              value={ description }
              onChange={ this.main }
            />
          </label>
          <label htmlFor="image">
            Image:
            <input
              type="text"
              name="image"
              data-testid="edit-input-image"
              value={ image }
              onChange={ this.main }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ this.isEmpty() }
            onClick={ this.save }
          >
            Save
          </button>
        </form>
        { loading && <LoadingMsg /> }
        { redirect && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
