import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer';

function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
            <Header />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
} 

export default Layout;