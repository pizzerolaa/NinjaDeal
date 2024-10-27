import React from 'react';
import '../../index.css';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Ninja Deal</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-gray-300">Home</a></li>
                        <li><a href="#" className="hover:text-gray-300">About</a></li>
                        <li><a href="#" className="hover:text-gray-300">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;