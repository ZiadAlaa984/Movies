import React from 'react'
import MaxWidth from '../MaxWidth'

export default function Footer() {
    return (
        <footer className='bg-[#13161c]       backdrop-blur-md  w-full border-gray-200  relative'>
            <MaxWidth>
                <div className='h-full p-4 lg:p-2 gap-2  flex flex-col md:flex-row md:justify-between justify-center items-center'>
                    <div className='text-center md:text-left '>
                        <p className='text-sm text-white text-muted-foreground'>
                            &copy; {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>

                    <div className='flex items-center justify-center'>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6    '>
                            <span

                                className='text-sm  text-white text-muted-foreground '>
                                Terms
                            </span>
                            <span

                                className='text-sm text-nowrap text-white text-muted-foreground '>
                                Privacy Policy
                            </span>
                            <span

                                className='text-sm text-nowrap text-white text-muted-foreground '>
                                Cookie Policy
                            </span>
                        </div>
                    </div>
                </div>
            </MaxWidth>
        </footer>
    )
}


