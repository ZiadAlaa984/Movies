import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import img1 from '/slider/img1.jpg'
import img2 from '/slider/img2.jpg'
import img3 from '/slider/img3.jpg'
import img4 from '/slider/img4.jpg'
import './slider.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MaxWidth from '../MaxWidth';


export default function SliderMovies() {
    const [tvList, setTvList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                        }
                    }
                );
                const data = await response.json();
                console.log(data);
                setTvList(data.results); // Assuming 'results' contains an array of TV show details
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className='mt-6'>
            <MaxWidth>
                <h4 className='text-white font-bold text-2xl py-3'>Trending</h4>
            </MaxWidth>
            <Swiper
                autoplay={{
                    delay: 800,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {tvList.map((tvShow) => (
                    <SwiperSlide key={tvShow.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`}
                            className='w-full h-full object-cover'
                            alt={tvShow.name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}


