import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./custom";

import Layout from "./layout/Layout";
import Social from "./pages/Social";
import { RoutePaths } from "./routes/paths";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutePaths.social} element={<Social />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
