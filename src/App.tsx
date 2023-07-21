import { BrowserRouter as Router } from "react-router-dom";

import "./custom";

import Layout from "./layout/Layout";

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
