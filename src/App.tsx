import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

import Main from "./main/main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </>
  );
}

export default App;
