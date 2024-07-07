import React, { useEffect, useState } from 'react';
import MaxWidth from '../MaxWidth';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner';

export default function PopularDetails() {
    const { id } = useParams();
    const [popularDetails, setPopularDetails] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Corrected variable name

    useEffect(() => {
        async function fetchData(id) {
            setLoading(true)
            try {
                const detailsResponse = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });
                if (!detailsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }
                const detailsData = await detailsResponse.json();
                setPopularDetails(detailsData);
                console.log('Person details:', detailsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false)
            }
        }

        fetchData(id);
    }, [id]);
    if (loading) {
        return <Spinner />;
    }
    return (
        <div className=' bg-black pt-24'>
            <div style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${popularDetails.homepage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '90vh'
            }} className='flex'>
                <MaxWidth>
                    <div className="grid  gap-7 grid-cols-4">
                        <div className='col-span-4 md:col-span-2 lg:col-span-1 '>
                            <img src={popularDetails.profile_path ? `https://image.tmdb.org/t/p/w500${popularDetails.profile_path}` : 'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png'} className='rounded-md  object-cover w-full' alt="" />
                        </div>
                        <div className='col-span-4 md:col-span-2 lg:col-span-3 flex gap-6 p-5 flex-col h-full bg-opacity-60 bg-black/20'>
                            <h3 className='text-4xl capitalize font-semibold text-white'>{popularDetails.name}</h3>

                            {popularDetails.biography ? <> <h3 className='text-2xl font-semibold text-white'>Overview</h3>
                                <p className='text-md font-medium text-white'>{popularDetails.biography.slice(0, 500)}</p></> : null}
                            {popularDetails.birthday ? <p className='text-md font-medium text-white'>Birthday : {popularDetails.birthday}</p> : null}
                            {popularDetails.place_of_birth ? <p className='text-md font-medium text-white'><span>placeBirth : {popularDetails.place_of_birth}</span></p> : null}
                        </div>
                    </div>
                </MaxWidth>
            </div>
        </div>
    );
}

