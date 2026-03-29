import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CulturePage from './pages/CulturePage';
import AttractionsPage from './pages/AttractionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CustomizePage from './pages/CustomizePage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="/attractions" element={<AttractionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/customize" element={<CustomizePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;