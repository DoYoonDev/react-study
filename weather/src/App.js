import logo from './logo.svg';
import './App.css';
import Homepage from './page/Homepage';
import About from './page/About';
import Product from './page/Product';
import Detail from './page/ProductDetail';
import Login from './page/Login';
import User from './page/User';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  const PrivateRoute = () => {
    return authenticate == true ? <User /> : <Navigate to="/login" />
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Product />} />
        <Route path='/products/:id' element={<Detail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<PrivateRoute />} />
      </Routes>
    </div>
  );
}

export default App;
