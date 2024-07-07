import React, { useEffect, useState } from 'react';
import MaxWidth from '../MaxWidth';
import { Link } from 'react-router-dom';
import { Star } from "lucide-react";
import Spinner from '../../Components/Spinner';

export default function Search() {
    const [movies, setMovies] = useState([]);
    const [MovieAfterFilter, setMovieAfterFilter] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [FilterMovie, setFilterMovie] = useState('');
    const [loading, setLoading] = useState(true); // Corrected variable name

    // Fetch movie data on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch list of popular movies
                const moviesResponse = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const moviesData = await moviesResponse.json();
                setMovies(moviesData.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when fetching is complete
            }
        }

        fetchData();
    }, []);

    // Search movie by name based on searchQuery state
    useEffect(() => {
        async function fetchData(query) {
            try {
                // Fetch list of movies based on search query
                const moviesResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const moviesData = await moviesResponse.json();
                setMovies(moviesData.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when fetching is complete
            }
        }

        if (searchQuery.trim() !== '') {
            fetchData(searchQuery);
        }
    }, [searchQuery]);

    // Filter movies based on selected genre (FilterMovie state)
    useEffect(() => {
        async function filterData(filter) {
            try {
                setLoading(true);
                if (!filter) {
                    setMovieAfterFilter([]); // Clear filtered movies if no filter selected
                    return;
                }
                // Fetch data based on FilterMovie
                const moviesResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${filter}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const moviesData = await moviesResponse.json();
                setMovieAfterFilter(moviesData.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false when fetching is complete
            }
        }

        filterData(FilterMovie);
    }, [FilterMovie]);

    // Handle input change for search query
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle genre filter button click
    const filterMovie = (e) => {
        const genre = e.target.value;
        setFilterMovie(genre);
    };

    if (loading) {
        return <Spinner />; // Display spinner while loading
    }

    return (
        <div className='min-h-screen pt-24'>
            <MaxWidth>
                <div className='flex justify-center flex-wrap items-center gap-3'>
                    <button onClick={filterMovie} value='80' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Crime</button>
                    <button onClick={filterMovie} value='28' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Action</button>
                    <button onClick={filterMovie} value='12' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Adventure</button>
                    <button onClick={filterMovie} value='16' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Animation</button>
                    <button onClick={filterMovie} value='35' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Comedy</button>
                    <button onClick={filterMovie} value='99' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Documentary</button>
                    <button onClick={filterMovie} value='18' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Drama</button>
                    <button onClick={filterMovie} value='10751' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Family</button>
                    <button onClick={filterMovie} value='14' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Fantasy</button>
                    <button onClick={filterMovie} value='36' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>History</button>
                    <button onClick={filterMovie} value='27' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Horror</button>
                    <button onClick={filterMovie} value='10402' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Music</button>
                    <button onClick={filterMovie} value='9648' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Mystery</button>
                    <button onClick={filterMovie} value='10749' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Romance</button>
                    <button onClick={filterMovie} value='878' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Science Fiction</button>
                    <button onClick={filterMovie} value='10770' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>TV Movie</button>
                    <button onClick={filterMovie} value='53' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Thriller</button>
                    <button onClick={filterMovie} value='10752' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>War</button>
                    <button onClick={filterMovie} value='37' type='button' className='text-white rounded-full p-3 text-sm bg-gray-800'>Western</button>
                </div>
                <form className="max-w-3xl mx-auto my-6">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={handleChange} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#E50914] focus:border-[#E50914] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E50914] dark:focus:border-[#E50914]" placeholder="Search Movie Name..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#E50914] hover:bg-[#E50914] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-[#E50914] dark:focus:ring-[#E50914]">Search</button>
                    </div>
                </form>

                <div className="row">
                    {(MovieAfterFilter.length > 0 ? MovieAfterFilter : movies).map(movie => (
                        <Link to={`/movies/${movie.id}`} key={movie.id} className="col w-full cursor-pointer transition-all duration-700 hover:scale-105 md:w-1/2 lg:w-1/3 xl:w-1/5">
                            <div className="inner p-4">
                                <div className='relative'>
                                    <div className='absolute top-3 right-2 h-full'>
                                        <span className='text-sm font-semibold text-white bg-black/60 rounded-md flex flex-row items-center p-2'>{movie.vote_average.toFixed(1)}<Star className="h-4 text-yellow-400 fill-yellow-400" /></span>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='w-full object-contain' alt="" />
                                </div>

                                <h4 className='text-md pt-3 capitalize text-white font-bold'>{movie.title.slice(0, 25)}</h4>

                                <h6 className='text-md capitalize text-white'>{movie.overview.slice(0, 25)}</h6>
                            </div>
                        </Link>
                    ))}
                </div>
            </MaxWidth>
        </div>
    );
}
