import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, NotFound } from "app/views";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
