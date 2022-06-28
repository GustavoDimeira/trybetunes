import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Paginas/Login';
import Search from './Paginas/Search';
import Album from './Paginas/Album';
import Favorites from './Paginas/Favorites';
import Profile from './Paginas/Profile';
import ProfileEdit from './Paginas/ProfileEdit';
import NotFound from './Paginas/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ () => <Login /> } />
            <Route exact path="/search" render={ () => <Search /> } />
            <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route exact path="/favorites" render={ () => <Favorites /> } />
            <Route exact path="/profile" render={ () => <Profile /> } />
            <Route exact path="/profile/edit" render={ () => <ProfileEdit /> } />
            <Route exact path="*" render={ () => <NotFound /> } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
