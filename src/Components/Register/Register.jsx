import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation

export default function Register() {
    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(15, 'Name must not exceed 15 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
        // rePassword: Yup.string()
        //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
        //     .required('Confirm Password is required'),
    });

    // Define onSubmit handler
    async function handleRegister(formValues) {
        console.log(formValues);
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/authentication/token/validate_with_login',
                {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcyMDE3Njc2MS45NDQ1MjQsInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0MSwbzHzcXCT6wf6zUYusglFo-neMCjESKiYC3n-Yts'
                    },
                    body: JSON.stringify(formValues)
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            s
            console.error('Error fetching data:', error);
        }
    }

    // Initialize useFormik hook with validationSchema and onSubmit handler
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            // rePassword: ''
        },
        validationSchema,
        onSubmit: handleRegister // Ensure this calls handleRegister correctly
    });

    // Destructure necessary properties from formik
    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;

    return (
        <div className='flex justify-center items-center h-screen pt-20'>
            <form onSubmit={handleSubmit} className="max-w-lg md:min-w-[500px] backdrop-blur-md p-12">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className={`block placeholder:text-white py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E50914] focus:outline-none focus:ring-0 focus:border-[#E50914] peer`}
                        placeholder=" "
                    />
                    {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#E50914] peer-focus:dark:text-[#E50914] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`block placeholder:text-white py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E50914] focus:outline-none focus:ring-0 focus:border-[#E50914] peer`}
                        placeholder=" "
                    />
                    {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#E50914] peer-focus:dark:text-[#E50914] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`block placeholder:text-white py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E50914] focus:outline-none focus:ring-0 focus:border-[#E50914] peer`}
                        placeholder=" "
                    />
                    {errors.password && touched.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#E50914] peer-focus:dark:text-[#E50914] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                {/* <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rePassword}
                        className={`block placeholder:text-white py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 ${errors.rePassword && touched.rePassword ? 'border-red-500' : 'border-gray-300'} appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#E50914] focus:outline-none focus:ring-0 focus:border-[#E50914] peer`}
                        placeholder=" "
                    />
                    {errors.rePassword && touched.rePassword && <div className="text-red-500 text-sm mt-1">{errors.rePassword}</div>}
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#E50914] peer-focus:dark:text-[#E50914] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div> */}

                <button type="submit" className="text-white bg-[#E50914] hover:bg-[#E50914] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#E50914] dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    );
}
