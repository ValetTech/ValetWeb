import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';
import Settings from '../Pages/Settings';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/settings" element={<Settings />} />
      <Route path="/reservations" element={<Settings />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
