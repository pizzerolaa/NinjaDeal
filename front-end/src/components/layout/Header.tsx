import React from 'react';
import '../../index.css';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Ninja Deal</h1>
            </div>
        </header>
    );
};

export default Header;