import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import GlobalStyles from './share/styles/GlobalStyles';
import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import LoadingSpinner from './share/components/LoadingSpinner/LoadingSpinner';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    {/* <PersistGate loading={<LoadingSpinner />} persistor={persistStore(store)}> */}
    <GlobalStyles>
      <App />
    </GlobalStyles>
    {/* </PersistGate> */}
  </Provider>
);
