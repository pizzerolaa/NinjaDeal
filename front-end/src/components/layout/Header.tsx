'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeOff, User, Menu, ShoppingCart } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';

function Header() {
    const [isScroller, setIsScroller] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScroller(window.scrollY > 50);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-10 transition-all duration-300 ${isScroller ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-transparent'}`}>
            <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <Link to='/' className='flex items-center space-x-2'>
                        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                            <EyeOff className="h-8 w-8 text-black" />
                        </motion.div>
                        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-red-700'>
                            Ninja Deal
                        </h1>
                    </Link>
                </div>
                <nav className='hidden md:block'>
                    <ul className='flex space-x-6'>
                        <li>
                            <Link to='/' className='text-black hover:text-red-700 transition-colors'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className='text-black hover:text-red-700 transition-colors'>
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className='text-black hover:text-red-700 transition-colors'>
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className='flex items-center space-x-4'>
                    <Button variant='ghost' size='icon' className='text-black hover:text-red-700 transition-colors'>
                        <User className='h-5 w-5'/>
                        <span className='sr-only'>Login</span>
                    </Button>
                    <Button variant='ghost' size='icon' className='text-black hover:text-red-700 transition-colors'>
                        <ShoppingCart className='h-5 w-5'/>
                        <span className='sr-only'>Cart</span>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant='ghost' size='icon' className='md:hidden text-black hover:text-red-700 transition-colors'>
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='right' className='w-[200px] sm:w-[300px]'>
                            <nav className='flex flex-col space-y-4 mt-8'>
                                <Link to='/' className='text-lg font-medium hover:text-red-700 transition-colors'>
                                    Home
                                </Link>
                                <Link to='/' className='text-lg font-medium hover:text-red-700 transition-colors'>
                                    Categories
                                </Link>
                                <Link to='/' className='text-lg font-medium hover:text-red-700 transition-colors'>
                                    About
                                </Link>
                            </nav>
                        </SheetContent> 
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;