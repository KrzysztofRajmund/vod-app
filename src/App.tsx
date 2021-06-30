import { ThemeContext } from '@emotion/react';
import React, { useContext, useEffect } from 'react';
//components
import SplashScreen from './components/SplashScreen/SplashScreen';
//context
import { ContextUserLogin } from './components/utils/ThemeContext';


const App: React.FC = () => {

  const loginUser = () => {
    console.log('i am login');
  }

  return (
    <ThemeContext.Provider value={{}}>
      <SplashScreen loginUser={loginUser} />
    </ThemeContext.Provider>
  );
};

export default App;

