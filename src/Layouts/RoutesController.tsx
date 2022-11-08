import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight';
import {
  IconBoxModel2,
  IconBrandAirtable,
  IconCalendarEvent,
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
  IconSearch,
  IconSettings,
} from '@tabler/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from '../Components/Login/LoginForm';
import AreasPage from '../Pages/AreasPage';
import Calendar from '../Pages/Calendar';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import Orders from '../Pages/Orders';
import Reservations from '../Pages/Reservations';
import Seating from '../Pages/Seating';
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
      title: 'Seating',
      group: 'main',
      onTrigger: NavigateTo,
      keywords: '',
      link: '/seating',
      icon: <IconDeviceDesktopAnalytics />,
    },
    {
      title: 'Orders',
      group: 'search',
      onTrigger: NavigateTo,
      keywords: '',
      link: '/orders',
      icon: <IconGauge />,
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/seating" element={<Seating />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </SpotlightProvider>
  );
}
