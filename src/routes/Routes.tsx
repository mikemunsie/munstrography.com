import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import {RoutePaths} from "./paths";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path={RoutePaths.home} element={<Home />} />
        </Routes>
    </Router>
);

export default AppRoutes
