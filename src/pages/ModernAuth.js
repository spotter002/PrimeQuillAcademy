import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ModernAuth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const watchedPassword = watch('password', '');

  useEffect(() => {
    setPassword(watchedPassword || '');
  }, [watchedPassword]);

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500', checks };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500', checks };
    if (score <= 4) return { score, label: 'Good', color: 'bg-blue-500', checks };
    return { score, label: 'Strong', color: 'bg-green-500', checks };
  };

  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const toggleMode = () => {
    const newPath = isLogin ? '/signup' : '/login';
    navigate(newPath);
    reset();
    setShowPassword(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let user;
      if (isLogin) {
        user = await login(data.email, data.password);
        toast.success('Welcome back!');
      } else {
        user = await signup(data.name, data.email, data.password, 'client');
        toast.success('Account created successfully!');
      }
      
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'freelancer':
          navigate('/freelancer-dashboard');
          break;
        case 'client':
        default:
          navigate('/dashboard');
          break;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="glass rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            
            {/* Left Side - Welcome/Branding */}
            <div className={`relative bg-gradient-to-br from-teal-600 to-blue-600 p-12 flex flex-col justify-center text-white transition-all duration-700 ${!isLogin ? 'lg:order-2' : ''}`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <Sparkles className="w-12 h-12 mb-4 animate-pulse" />
                  <h1 className="text-4xl font-bold mb-4">
                    {isLogin ? 'Welcome Back!' : 'Join FreelanceHub'}
                  </h1>
                  <p className="text-xl opacity-90 leading-relaxed">
                    {isLogin 
                      ? 'Transform your ideas into reality with AI-powered project refinement and expert freelance services.'
                      : 'Start your journey with professional freelance services. Get your projects done with quality and precision.'
                    }
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>AI-Powered Project Refinement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                    <span>Professional Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                    <span>Secure & Fast Delivery</span>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="text-sm opacity-75">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </p>
                  <button
                    onClick={toggleMode}
                    className="mt-2 text-white font-semibold hover:underline transition-all duration-300 flex items-center group"
                  >
                    {isLogin ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className={`p-12 flex flex-col justify-center transition-all duration-700 ${!isLogin ? 'lg:order-1' : ''}`}>
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p className="text-gray-600">
                    {isLogin ? 'Enter your credentials to access your account' : 'Fill in your details to get started'}
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {!isLogin && (
                    <div className="animate-fadeIn">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('name', { required: !isLogin && 'Name is required' })}
                          type="text"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...register('password', { 
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                          }
                        })}
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                    
                    {!isLogin && password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Password strength:</span>
                          <span className={`text-sm font-medium ${
                            passwordStrength.label === 'Weak' ? 'text-red-600' :
                            passwordStrength.label === 'Fair' ? 'text-yellow-600' :
                            passwordStrength.label === 'Good' ? 'text-blue-600' :
                            'text-green-600'
                          }`}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-xs">
                          <div className={`flex items-center space-x-2 ${passwordStrength.checks?.length ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.checks?.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            <span>At least 8 characters</span>
                          </div>
                          <div className={`flex items-center space-x-2 ${passwordStrength.checks?.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.checks?.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            <span>Lowercase letter</span>
                          </div>
                          <div className={`flex items-center space-x-2 ${passwordStrength.checks?.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.checks?.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            <span>Uppercase letter</span>
                          </div>
                          <div className={`flex items-center space-x-2 ${passwordStrength.checks?.number ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.checks?.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            <span>Number</span>
                          </div>
                          <div className={`flex items-center space-x-2 ${passwordStrength.checks?.special ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.checks?.special ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            <span>Special character</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                      </label>
                      <button type="button" className="text-sm text-teal-600 hover:text-teal-500 transition-colors">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <Link 
                      to={isLogin ? '/signup' : '/login'} 
                      className="text-teal-600 hover:text-teal-500 transition-colors font-semibold"
                    >
                      {isLogin ? 'Sign up here' : 'Sign in here'}
                    </Link>
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    By continuing, you agree to our{' '}
                    <button className="text-teal-600 hover:text-teal-500 transition-colors">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button className="text-teal-600 hover:text-teal-500 transition-colors">
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernAuth;