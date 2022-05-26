import React from 'react';
import {configureFontAwesomePro} from 'react-native-fontawesome-pro';

import Routes from './routes';

const App = () => {
  configureFontAwesomePro();
  return <Routes />;
};

export default App;
