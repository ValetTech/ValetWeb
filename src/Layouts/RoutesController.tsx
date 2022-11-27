import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight';
import {
  IconBoxModel2,
  IconBrandAirtable,
  IconCalendarEvent,
  IconCalendarStats,
  IconHome2,
  IconSearch,
  IconSettings,
} from '@tabler/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RequireAuth from '../Features/Auth/RequireAuth';
import AreasPage from '../Pages/AreasPage';
import Calendar from '../Pages/Calendar';
import Dashboard from '../Pages/Dashboard';
import GenerateData from '../Pages/GenerateData';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';
import Reservations from '../Pages/Reservations';
import Sake from '../Pages/Sake';
import Settings from '../Pages/Settings';
import TablesPage from '../Pages/TablesPage';

export default function RoutesController() {
  const navigate = useNavigate();
  function NavigateTo(action: SpotlightAction) {
    navigate(action.link);
  }

  const actions: SpotlightAction[] = [
    {
      title: 'Dashboard',
      group: 'main',
      onTrigger: NavigateTo,
      keywords: '',
      link: '/',
      icon: <IconHome2 />,
    },
    {
      title: 'Reservations',
      group: 'main',
      onTrigger: NavigateTo,
      keywords: '',
      link: '/reservations',
      icon: <IconCalendarStats />,
    },
    {
      title: 'Tables',
      group: 'Admin',
      onTrigger: NavigateTo,
      keywords: '',
      link: '/tables',
      icon: <IconBrandAirtable />,
    },
    {
      title: 'Calendar',
      group: 'Admin',
      onTrigger: NavigateTo,
      keywords: '',
      link: '/calendar',
      icon: <IconCalendarEvent />,
    },
    {
      title: 'Area Designer',
      group: 'Admin',
      onTrigger: NavigateTo,
      keywords: '',
      link: '/areas',
      icon: <IconBoxModel2 />,
    },
    {
      title: 'Settings',
      group: 'Other',
      onTrigger: NavigateTo,
      keywords: '',
      link: '/settings',
      icon: <IconSettings />,
    },
  ];
  return (
    <SpotlightProvider
      transitionDuration={300}
      transition="slide-down"
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      nothingFoundMessage="Nothing found..."
      shortcut={['mod + P', 'mod + K', '/']}
    >
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sake" element={<Sake />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/areas" element={<AreasPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/GenerateData" element={<GenerateData />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SpotlightProvider>
  );
}
