import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

//COMPONENTS
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

//PAGES
import Home from './pages/home/Home';
import LogIn from './pages/login-signup/LogIn';
import SignUp from './pages/login-signup/SignUp';
import AboutUs from './pages/infoPages/AboutUs';
import PrivacyPolicy from './pages/infoPages/PrivacyPolicy';
import RentPolicy from './pages/infoPages/RentPolicy';
import FAQ from './pages/infoPages/FAQ';
import Cars from './pages/cars/Cars';
import CarDetails from './pages/carDetails/CarDetails';
import EditCar from './pages/editCar/EditCar';
import NewCar from './pages/newCar/NewCar';
import Reservations from './pages/reservations/Reservations';
import EditReservation from './pages/editReservation/EditReservation';
import Error404 from './pages/error404/Error404';
import Drafts from './pages/drafts/Drafts';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <Route path='/new/drafts' element={user ? <Drafts /> : <Navigate to='/login' />} />
            <Route path='/reservations' element={user ? <Reservations /> : <Navigate to='/login' />} />
            <Route path='/reservations/edit/:id' element={user ? <EditReservation /> : <Navigate to='/login' />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
};

export default App;
