import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//PAGES
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RentPolicy from './pages/RentPolicy';
import FAQ from './pages/FAQ';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import EditCar from './pages/EditCar';
import NewCar from './pages/NewCar';
import Reservations from './pages/Reservations';
import EditReservation from './pages/EditReservation';
import Error404 from './pages/Error404';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={!user ? <Home /> : <Navigate to='/cars' />} />
          <Route path='/login' element={!user ? <LogIn /> : <Navigate to='/cars' />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/cars' />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
          <Route path='/rentpolicy' element={<RentPolicy />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/cars' element={user ? <Cars /> : <Navigate to='/login' />} />
          <Route path='/cars/:id' element={user ? <CarDetails /> : <Navigate to='/login' />} />
          <Route path='/cars/edit/:id' element={user ? <EditCar /> : <Navigate to='/login' />} />
          <Route path='/new' element={user ? <NewCar /> : <Navigate to='/login' />} />
          <Route path='/reservations' element={user ? <Reservations /> : <Navigate to='/login' />} />
          <Route path='/reservations/edit/:id' element={user ? <EditReservation /> : <Navigate to='/login' />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
