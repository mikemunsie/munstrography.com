import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import Share from "./pages/Share";
import Social from "./pages/Social";
import { RoutePaths } from "./routes/paths";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutePaths.social} element={<Social />} />
        <Route path={RoutePaths.share} element={<Share />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
