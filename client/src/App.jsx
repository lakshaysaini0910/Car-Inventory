import './App.css'
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from "./components/ProtectedRoute";
import AdminNavbar from './pages/Admin/AdminNavbar/AdminNavbar';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import AddCars from './pages/Admin/AddCars/AddCars';
import DeleteCars from './pages/Admin/DeleteCars/DeleteCars';
import UpdateCars from './pages/Admin/UpdateCars/UpdateCars';

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import About from './pages/AboutUs/About'
import StockCars from './pages/StockCarPage/StockCars'
import SellCars from './pages/SellCarPage/SellCars'
import CarDetails from './pages/CarDetails/CarDetails';
import NotFound from './pages/NotFound/NotFound';

function App() {

  console.log("API URL:", import.meta.env.VITE_API_URL);
  
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />


        <Route path="/admin" element={<ProtectedRoute><AdminNavbar /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="cars/add" element={<AddCars />} />
          <Route path="cars/delete" element={<DeleteCars />} />
          <Route path="cars/update" element={<UpdateCars />} />
        </Route>


        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stock-cars" element={<StockCars />} />
        <Route path="stock-cars/:id" element={<CarDetails />} />
        <Route path="/sell-cars" element={<SellCars />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />
    </>
  )
}

export default App