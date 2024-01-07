import { BrowserRouter, Routes, Route } from 'react-router-dom';

//COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//PAGES
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import EditCar from './pages/EditCar';
import NewCar from './pages/NewCar';
import Reservations from './pages/Reservations';
import EditReservation from './pages/EditReservation';
import Error404 from './pages/Error404';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/cars' element={<Cars />} />
          <Route path='/cars/:id' element={<CarDetails />} />
          <Route path='/cars/edit/:id' element={<EditCar />} />
          <Route path='/new' element={<NewCar />} />
          <Route path='/reservations' element={<Reservations />} />
          <Route path='/reservations/edit/:id' element={<EditReservation />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
