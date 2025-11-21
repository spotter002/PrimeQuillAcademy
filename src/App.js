import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import NewLanding from './pages/NewLanding';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import QuoteRequest from './pages/QuoteRequest';
import Messages from './pages/Messages';
import Landing from './pages/Landing';
import ModernAuth from './pages/ModernAuth';
import EnhancedClientDashboard from './pages/EnhancedClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import EnhancedAdminDashboard from './pages/EnhancedAdminDashboard';
import NotFound from './pages/NotFound';
import Samples from './pages/Samples';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import Notifications from './pages/Notifications';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-teal"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<NewLanding />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<ProjectDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<QuoteRequest />} />
            <Route path="/messages" element={<Messages />} />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route path="/post-job" element={<Landing />} />
            <Route path="/login" element={<ModernAuth />} />
            <Route path="/signup" element={<ModernAuth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute roles={['client']}>
                  <EnhancedClientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/freelancer-dashboard" 
              element={
                <ProtectedRoute roles={['freelancer']}>
                  <FreelancerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <EnhancedAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/samples" element={<Samples />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
