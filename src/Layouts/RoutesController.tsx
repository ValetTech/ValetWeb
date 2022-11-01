import { Route, Routes } from 'react-router-dom';
import AreasPage from '../Pages/AreasPage';
import Calendar from '../Pages/Calendar';
import Dashboard from '../Pages/Dashboard';
import NotFound from '../Pages/NotFound';
import Orders from '../Pages/Orders';
import Reservations from '../Pages/Reservations';
import Seating from '../Pages/Seating';
import Settings from '../Pages/Settings';
import TablesPage from '../Pages/TablesPage';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/seating" element={<Seating />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/tables" element={<TablesPage />} />
      <Route path="/areas" element={<AreasPage />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
