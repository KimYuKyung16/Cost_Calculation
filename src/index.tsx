import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'; // persist-redux 추가
import  {store, persistor } from './redux/config/store'; // persist-redux 추가


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}> {/* persist-redux 추가 */} 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>{/* persist-redux 추가 */}
    </Provider>
  // </React.StrictMode>
);


