import './css/App.css'
import Home from "./pages/Home.jsx";
import {Routes, Route} from "react-router-dom";
import Favorites from "./pages/Favorites.jsx";
import {MovieProvider} from "./contexts/MovieContext.jsx";
import Navbar from "./components/Navbar.jsx";


function App() {

    return (
        <MovieProvider>
            <Navbar/>
            <main className="main-content">
                <Routes>

                    <Route path="/" element={<Home/>} /*page router*/ />
                    <Route path="/favorites" element={<Favorites/>}/>

                </Routes>
            </main>
        </MovieProvider>
    );
}


export default App
