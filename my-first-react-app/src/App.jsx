import {useEffect, useState} from 'react'
import { useDebounce } from 'react-use';
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { updateSearchCount } from './APPWRITE.JS';
import { getTrendingMovies } from './APPWRITE.JS';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setsearchTerm] = useState('');
  const [erroressage, seterroressage] = useState('')
  const [movieList, setmovieList] = useState([])
  const [trendingMovies, settrendingMovies] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [debounceSearchTerm, setdebounceSearchTerm] = useState('')

  useDebounce(() => {
    setdebounceSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setisLoading(true)
    seterroressage('')
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      // console.log(data);

      if (data.response === false){
        seterroressage(data.error || 'failed to fetch movies')
        setmovieList([]);
        return;
      }
      setmovieList(data.results || [])

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      seterroressage('Error fetching movies. please try again later');
    } finally{
      setisLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      settrendingMovies(movies)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, [])
  
  
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                // <MovieCard key={movie.id} movie={movie}/>
                <li key={movie.id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All movies</h2>

          {isLoading ? (
           <Spinner />
          ) : erroressage ? (
            <p className='text-red-500'>{erroressage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                // <p key={movie.id} className='text-white'>{movie.title}</p>
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App