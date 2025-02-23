import MovieCard from "../components/MovieCard.jsx";
import {useState, useEffect} from "react" // this is apparently a hook

import {searchMovies, getPopularMovies} from "../services/api.js";

import "../css/Home.css"


function Home() {

    // name of state, function that updates state
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);


    const handleSearch = async (e) => {
        e.preventDefault(); // prevents the page from getting rid of the search value
        if (!searchQuery.trim()) return; // removes whitespace
        if(loading) return;

        setLoading(true);
        //setSearchQuery("-----"); // we can manually set the search string
        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }
        catch (err) {
            console.log(err);
            setError("Failed to search movie")
        }
        finally {
            setLoading(false);
        }

        //setSearchQuery(""); if we wanted to clear the results on search
    }



    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}


        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
        <div className="movie-grid">
            {movies.map((movie) =>
                    <MovieCard movie={movie} key={movie.id}/>)}
                </div>)}
                </div>;


            }

export default Home;
//  the && is a conditional