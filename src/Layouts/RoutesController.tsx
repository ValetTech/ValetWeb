import { HashRouter, Route, Routes } from 'react-router-dom';
import AppPage from '../Pages/AppPage';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';

export default function RoutesController() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/app" element={<AppPage />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
