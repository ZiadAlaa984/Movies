import React, { useEffect, useState } from 'react';
import MaxWidth from '../MaxWidth';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner';

export default function Popular() {
    const [Populars, setPopulars] = useState([]);
    const [loading, setLoading] = useState(true); // Corrected variable name

    useEffect(() => {
        async function fetchData() {

            try {
                setLoading(true)
                // Fetch list of movies
                const moviesResponse = await fetch('https://api.themoviedb.org/3/trending/person/day?language=en-US', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const PopularData = await moviesResponse.json();
                setPopulars(PopularData.results);
                console.log(PopularData.results);
                // Fetch details of a specific movie (example with movie id 786892)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, []);
    if (loading) {
        return <Spinner />
    }
    return (
        <MaxWidth>
            <h4 className='text-white font-bold pt-24  text-2xl py-3'>Populars</h4>
            <div className="row">
                {Populars.map(Popular => (
                    <Link to={`/Popular/${Popular.id}`} key={Popular.id} className="col w-full cursor-pointer transition-all duration-700 hover:scale-105 md:w-1/2 lg:w-1/3 xl:w-1/5">
                        <div className="inner p-3">
                            <img src={Popular.profile_path ? `https://image.tmdb.org/t/p/w500/${Popular.profile_path}` : 'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png'} className='w-full object-cover h-[260px]' alt="" />
                            <h4 className='text-md pt-3 capitalize text-white font-bold'>{Popular.name}</h4>
                            <h6 className='text-md capitalize text-white'>{Popular.known_for_department}</h6>
                        </div>
                    </Link>
                ))}
            </div>
        </MaxWidth>
    );
}
