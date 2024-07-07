import React from 'react';

export default function MaxWidth({ children }) {
    return (
        <div className='max-w-screen-xl p-2 mx-auto'>
            <div className='container '>
                {children}
            </div>
        </div>
    );
}
