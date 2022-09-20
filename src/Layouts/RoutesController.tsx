import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';
import Reservations from '../Pages/Reservations';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
