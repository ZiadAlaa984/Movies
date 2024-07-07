import React, { useEffect, useState } from 'react';

// import Swiper styles


import Slider from '../Slider/Slider';
import Movies from '../Movies/Movies';
import SliderMovies from '../SliderMovies/SliderMovies';
import TV from '../TV/TV';
import UpComing from '../UpComing/UpComing';
export default function Home() {


    return (
        <>

            <div className='pt-20 md:pt-0'>
                <Slider />
                <TV />
                <SliderMovies />
                <UpComing />
                <Movies />
            </div>



        </>
    );

}
