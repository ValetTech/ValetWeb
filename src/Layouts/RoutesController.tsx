import { Route, Routes } from 'react-router-dom';
import Calendar from '../Pages/Calendar';
import Dashboard from '../Pages/Dashboard';
import NotFound from '../Pages/NotFound';
import Orders from '../Pages/Orders';
import Reservations from '../Pages/Reservations';
import Seating from '../Pages/Seating';
import TablesPage from '../Pages/TablesPage';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/seating" element={<Seating />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/tables" element={<TablesPage />} />
      <Route path="/calendar" element={<Calendar />} />
      {/* <Route path="/settings" element={<Settings />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
