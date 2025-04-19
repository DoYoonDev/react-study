import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Applayout from './layout/Applayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Applayout />} >
        <Route index element={<Homepage />}/>
        <Route path='movies'>
          <Route index element={<MoviePage />}/>
          <Route path=':id' element={<MovieDetailPage />}/>
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
