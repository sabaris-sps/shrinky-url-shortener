import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Redirect from "./components/Redirect";
import List from "./components/List";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<List />} />
          <Route path="/:slug" element={<Redirect />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
