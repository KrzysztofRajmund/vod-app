import React from 'react';
//router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//components
import SplashScreen from './components/SplashScreen/SplashScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import PrivateRoute from './components/utils/PrivateRoute';
import NoAuth from './components/utils/NoAuth';


const App: React.FC = () => {

  const loginUser = async (e: any, history: any) => {
    e.preventDefault();
    try {
      const url = 'https://thebetter.bsgroup.eu/Authorization/SignIn';
      const header = { 'Content-Type': 'application/json' };
      const response = await fetch(url, {
        method: 'POST',
        body: '{}',
        headers: header
      });

      const data = await response.json();
      localStorage.setItem('jwtTokenBSG', data.AuthorizationToken.Token);
      history.push('/home');
    } catch (error) {
      console.log(error);
    };
  };



  return (
    <Router>
      <Switch>
        <Route path='/noauth'>
          <NoAuth />
        </Route>
        <PrivateRoute exact path='/home' component={HomeScreen} />
        <Route path='/'>
          <SplashScreen loginUser={loginUser} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

