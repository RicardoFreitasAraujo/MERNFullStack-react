import React, {Suspense} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./user/pages/User'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const Auth = React.lazy(() => import('./user/pages/Auth'));


//import Auth from './user/pages/Auth';
//import NewPlace from './places/pages/NewPlace';
//import UpdatePlace from './places/pages/UpdatePlace';
//import UserPlaces from './places/pages/UserPlaces';
//import Users from './user/pages/User';


const App = () => {

  const {token, login, logout, userId} = useAuth();

  let routes;
  if (token) {
    routes = (
    <Switch>
      <Route path="/" component={Users} exact={true}/>
      <Route path="/:userId/places" component={UserPlaces} exact={true} />
      <Route path="/auth" component={Auth} exact={true}/>
      <Route path="/places/new" component={NewPlace} exact={true}/>
      <Route path="/places/:placeId" component={UpdatePlace} exact={true}/>
      <Redirect to="/"/>
    </Switch>);
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact={true}/>
        <Route path="/:userId/places" component={UserPlaces} exact={true} />
        <Route path="/auth" component={Auth} exact={true}/>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider 
        value={{
            isLoggedIn: !!token, 
            token: token,
            userId: userId, 
            login: login, 
            logout: logout
    }}>
      <BrowserRouter>
        <MainNavigation/>
        <main>
          <Suspense fallback={<div className="center"> <LoadingSpinner/></div>}>
            <Switch>
              {routes}
            </Switch>
          </Suspense>
        </main>  
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
