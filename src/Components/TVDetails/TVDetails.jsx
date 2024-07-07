import React, { useEffect, useState } from 'react';
import MaxWidth from '../MaxWidth';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner';

export default function TVDetails() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [videoDetails, setVideoDetails] = useState([]);
    const [videoError, setVideoError] = useState(false); // State to track if video fetch fails
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        async function fetchData(id) {
            try {
                const detailsResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const detailsData = await detailsResponse.json();
                setMovieDetails(detailsData);
                console.log('TV Show details:', detailsData);
            } catch (error) {
                console.error('Error fetching TV show data:', error);
            }
        }

        async function fetchVideo(id) {
            try {
                const videoResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                const videoData = await videoResponse.json();
                if (videoData.results && videoData.results.length > 0) {
                    setVideoDetails(videoData.results);
                    console.log('Video details:', videoData.results);
                } else {
                    setVideoError(true); // Set videoError state if no videos are found
                }
            } catch (error) {
                console.error('Error fetching video data:', error);
                setVideoError(true); // Set videoError state if there's an error fetching video data
            } finally {
                setLoading(false); // Update loading state after fetching data
            }
        }

        fetchData(id);
        fetchVideo(id);
    }, [id]);

    if (loading) {
        return <Spinner />; // Render Spinner component while data is loading
    }

    return (
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
                        <div className='col-span-4 lg:col-span-1 xl:col-span-1'>
                            <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} className='rounded-md object-cover w-full' alt="" />
                        </div>
                        <div className='col-span-4 lg:col-span-3 flex gap-6 p-5 flex-col h-full bg-opacity-60 bg-black/20'>
                            <h3 className='text-4xl capitalize font-semibold text-white'>{movieDetails.name}</h3>
                            <span className='text-2xl font-semibold text-white'>Overview</span>
                            <p className='text-md font-medium text-white'>{movieDetails.overview}</p>
                            <div className='text-white'>
                                <span>Created by: {movieDetails.created_by?.map(creator => creator.name).join(', ')}</span>
                            </div>
                            {/* Display video details if available */}
                            {videoDetails?.length > 0 && !videoError && (
                                <div className='text-white'>
                                    <div className='flex lg:flex-row flex-col w-full gap-10'>
                                        {videoDetails.slice(0, 2).map(video => (
                                            <iframe
                                                key={video.key}
                                                className='w-full h-60'
                                                src={`https://www.youtube.com/embed/${video.key}`}
                                                title={`YouTube video player - ${video.name}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Placeholder or message if no videos are found */}
                            {videoError && (
                                <div className="text-white">
                                    <p>No videos found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </MaxWidth>
            </div>
        </div>
    );
}
