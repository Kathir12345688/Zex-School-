import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Facilities from './pages/Facilities'
import Academics from './pages/Academics'
import Activities from './pages/Activities'
import Admissions from './pages/Admissions'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './admin/pages/Dashboard'
import NotFound from './pages/NotFound'
import HeroManagement from './admin/pages/HeroManagement'
import AboutManagement from './admin/pages/AboutManagement'
import FacilitiesManagement from './admin/pages/FacilitiesManagement'
import AcademicsManagement from './admin/pages/AcademicsManagement'
import ActivitiesManagement from './admin/pages/ActivitiesManagement'
import EventsManagement from './admin/pages/EventsManagement'
import AdmissionsManagement from './admin/pages/AdmissionsManagement'
import ContactMessages from './admin/pages/ContactMessages'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <div key={location.pathname} className="route-transition">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/hero" element={<HeroManagement />} />
          <Route path="/admin/about" element={<AboutManagement />} />
          <Route path="/admin/facilities" element={<FacilitiesManagement />} />
          <Route path="/admin/academics" element={<AcademicsManagement />} />
          <Route path="/admin/activities" element={<ActivitiesManagement />} />
          <Route path="/admin/events" element={<EventsManagement />} />
          <Route path="/admin/admissions" element={<AdmissionsManagement />} />
          <Route path="/admin/contact-messages" element={<ContactMessages />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
