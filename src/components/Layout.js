import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Briefcase, Bell, Settings, Menu, X, ChevronDown, BookOpen, Sparkles } from 'lucide-react';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="backdrop-blur-md bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-12">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">PrimeQuill</span>
                  <span className="text-gray-900">Academy</span>
                </div>
              </div>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/about" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                About
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                Services
              </Link>
              <Link to="/portfolio" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                Portfolio
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                Contact
              </Link>
              <Link to="/samples" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                Samples
              </Link>
              <Link to="/tools" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                Tools
              </Link>
              <Link to="/blog" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                Blog
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/quote"
                    className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    Get Quote
                  </Link>
                  
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        
                        {user.role === 'client' && (
                          <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <User className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                        )}
                        
                        {user.role === 'freelancer' && (
                          <Link to="/freelancer-dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                        )}
                        
                        {user.role === 'admin' && (
                          <Link to="/admin" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Settings className="w-4 h-4 mr-2" />
                            Admin
                          </Link>
                        )}
                        
                        <Link to="/notifications" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Bell className="w-4 h-4 mr-2" />
                          Notifications
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                    Sign In
                  </Link>
                  <Link
                    to="/quote"
                    className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    Get Quote
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-white/20"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/services"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/portfolio"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  to="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/samples"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Samples
                </Link>
                <Link
                  to="/tools"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tools
                </Link>
                <Link
                  to="/blog"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600">
                      Welcome, {user.name}
                    </div>
                    
                    <Link
                      to="/quote"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Quote
                    </Link>
                    
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    
                    <Link
                      to="/notifications"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Notifications
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/quote"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Quote
                    </Link>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-white/20"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;