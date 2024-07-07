import React, { useEffect, useState } from 'react';
import MaxWidth from '../MaxWidth';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import { ArrowRight, Check, Star } from "lucide-react";
export default function MovieDetails() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [videoDetails, setVideoDetails] = useState([]);
    const [loading, setLoading] = useState(true); // Corrected variable name
    //
    const [Recommend, setRecommend] = useState([]);

    useEffect(() => {
        async function fetchDataRecommend(id) {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/recommendations`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                        }
                    }
                );
                const data = await response.json();
                console.log(data);
                setRecommend(data.results); // Assuming 'results' contains an array of TV show details
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchDataRecommend(id);
    }, []);
    // //
    useEffect(() => {
        async function fetchData(id) {
            try {
                setLoading(true);
                // Fetch details of a specific movie (example with movie id 786892)
                const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const detailsData = await detailsResponse.json();
                setMovieDetails(detailsData);
                console.log('Movie details:', detailsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);

            }

        }
        async function fetchVideo(id) {
            try {
                const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const videoData = await videoResponse.json();
                setVideoDetails(videoData.results); // Assuming videoData.results contains an array of videos
                console.log('Video details:', videoData.results);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        }

        fetchVideo(id);
        fetchData(id);
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <div className='bg-black pt-20'>
                <div style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '90vh'
                }} className='flex'>
                    <MaxWidth>
                        <div className="grid min-h-[400px] gap-7 grid-cols-4">
                            <div className='col-span-4 lg:col-span-1 '>
                                <img src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` : 'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png'} className='rounded-md object-cover w-full' alt={movieDetails.title} />
                            </div>
                            <div className='col-span-4 lg:col-span-3  flex gap-6 p-5 flex-col h-full bg-opacity-60 bg-black/20'>
                                <h3 className='text-4xl capitalize font-semibold text-white'>{movieDetails.title}</h3>
                                <span className='text-2xl font-semibold text-white'>{movieDetails.overview ? 'Overview' : null}</span>
                                <p className='text-md font-medium text-white'>{movieDetails.overview}</p>
                                <div className='text-white'>
                                    <span>{movieDetails.director ? <> Director : {movieDetails.director}</> : null}</span>
                                </div>
                                <div className='text-white'>
                                    <span>{movieDetails.writer ? <> Writer : {movieDetails.writer}</> : null}</span>
                                </div>
                                {videoDetails?.length > 0 && (
                                    <div className='text-white'>
                                        <div className='flex flex-col lg:flex-row w-full gap-10'>
                                            {videoDetails.slice(0, 2).map((video) => (
                                                <iframe
                                                    key={video.key}
                                                    className='w-full h-60'
                                                    src={`https://www.youtube.com/embed/${video.key}`}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </MaxWidth>
                </div>
            </div>
            <MaxWidth>
                <h4 className='text-white font-bold text-2xl py-4'>Recommend</h4>
                <div className="row mb-2">
                    {Recommend.map(Recommend => (
                        <Link to={`/movies/${Recommend.id}`} key={Recommend.id} className="col w-full cursor-pointer transition-all duration-700 hover:scale-105 md:w-1/2 lg:w-1/3 xl:w-1/5">
                            <div className="inner p-4">
                                <div className='relative '>
                                    <div className='absolute top-3 right-2 h-full '>
                                        <span className='text-sm font-semibold text-white bg-black/60 rounded-md flex flex-row items-center p-2'>{Recommend.vote_average.toFixed(1)}<Star className="h-4 text-yellow-400 fill-yellow-400" />
                                        </span>
                                    </div>
                                    <img src={`https://image.tmdb.org/t/p/w500/${Recommend.poster_path}`} className='w-full object-contain ' alt="" />
                                </div>
                                <h4 className='text-md pt-3 capitalize text-white font-bold'>{Recommend.title.slice(1, 15)}</h4>
                                <h6 className='text-md capitalize text-white'>{Recommend.overview.slice(0, 25)}</h6>
                            </div>
                        </Link>
                    ))}
                </div>
            </MaxWidth>
        </div>


    );
}
