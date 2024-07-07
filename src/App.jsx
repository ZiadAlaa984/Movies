import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Movies from './Components/Movies/Movies'
import MovieDetails from './Components/MovieDetails/MovieDetails'
import SliderMovies from './Components/SliderMovies/SliderMovies'
import Popular from './Components/Popular/Popular'
import PopularDetails from './Components/PopularDetails/PopularDetails'
import TV from './Components/TV/TV'
import TVDetails from './Components/TVDetails/TVDetails'
import Search from './Components/Search/Search'
import TopRated from './Components/TopRated/TopRated'
import UpComing from './Components/UpComing/UpComing'

function App() {
  let router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: 'Login', element: <Login /> },
        { path: 'Popular', element: <Popular /> },
        { path: 'Register', element: <Register /> },
        { path: 'Movies', element: <Movies /> },
        { path: 'SliderMovies', element: <SliderMovies /> },
        { path: 'Search', element: <Search /> },
        { path: 'Movies/:id', element: <MovieDetails /> },
        { path: 'TV/:id', element: <TVDetails /> },
        { path: 'TV', element: <TV /> },
        { path: 'TopRated', element: <TopRated /> },
        { path: 'UpComing', element: <UpComing /> },
        { path: 'Popular/:id', element: <PopularDetails /> },
      ]
    }
  ])
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}
export default App



