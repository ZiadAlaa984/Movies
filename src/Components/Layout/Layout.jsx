import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout() {
    return (
        <>



            <Navbar />
            <div className='home relative'>
                <div className='overlay   absolute inset-0 bg-gray-900 opacity-60'>
                </div>
                <div className='z-50'>
                    <div className=' object-cover relative   w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
