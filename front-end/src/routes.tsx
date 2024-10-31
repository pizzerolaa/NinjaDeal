import { Routes, Route } from "react-router-dom";
import Layout from "@components/layout/Layout";
import Home from "@pages/Home";
import Auth from "@pages/Auth";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>} />
                <Route path="auth" element={<Auth/>} />
                {/* add more routes here*/}
            </Route>
        </Routes>
    );
};

export default AppRoutes;