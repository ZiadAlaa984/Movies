import React, { useEffect, useState } from 'react';
import MaxWidth from '../MaxWidth';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star } from "lucide-react";

export default function TV() {
    const [TV, setTV] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch list of movies
                const moviesResponse = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const moviesData = await moviesResponse.json();
                setTV(moviesData.results);
                console.log(moviesData.results);
                // Fetch details of a specific movie (example with movie id 786892)
                const detailsResponse = await fetch('https://api.themoviedb.org/3/movie/786892', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const detailsData = await detailsResponse.json();
                console.log('Movie details:', detailsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <MaxWidth>
            <h4 className='text-white font-bold text-2xl py-3'>Popular TV Shows</h4>
            <div className="row">
                {TV.map(TV => (
                    <Link to={`/TV/${TV.id}`} key={TV.id} className="col w-full cursor-pointer transition-all duration-700 hover:scale-105 md:w-1/2 lg:w-1/3 xl:w-1/5">
                        <div className="inner p-4">
                            <div className='relative '>
                                <div className='absolute top-3 right-2 h-full '>
                                    <span className='text-sm font-semibold text-white bg-black/60 rounded-md flex flex-row items-center p-2'>{TV.vote_average.toFixed(1)}<Star className="h-4 text-yellow-400 fill-yellow-400" />
                                    </span>
                                </div>
                                <img src={`https://image.tmdb.org/t/p/w500/${TV.poster_path}`} className='w-full object-contain ' alt="" />
                            </div>
                            <h4 className='text-md pt-3 capitalize text-white font-bold'>{TV.name.slice(0, 25)}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </MaxWidth>
    );
}
