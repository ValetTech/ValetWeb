import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';

export default function RoutesController() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
