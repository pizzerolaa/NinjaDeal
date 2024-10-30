import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer';

function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 text-black">
            <Header />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
} 

export default Layout;