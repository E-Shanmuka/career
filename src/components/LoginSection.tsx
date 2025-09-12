
import React, { useEffect, useState } from 'react';
import { Mail, Lock, LogIn, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

const LoginSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Forgot password modal state
  const [showForgot, setShowForgot] = useState(false);
  const [fpStep, setFpStep] = useState<'email' | 'otp'>('email');
  const [fpEmail, setFpEmail] = useState('');
  const [fpOtp, setFpOtp] = useState('');
  const [fpNewPassword, setFpNewPassword] = useState('');
  const [fpConfirmPassword, setFpConfirmPassword] = useState('');
  const [fpLoading, setFpLoading] = useState(false);

  // Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const user = await login(email, password, rememberMe);
      // Handle Remember Me persistence (email only)
      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
      } else {
        localStorage.removeItem('remembered_email');
      }
      toast.success('Login successful!');
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Image and Welcome Text */}
          <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold mb-4 animate-fadeInDown">Welcome Back!</h1>
            <p className="text-lg mb-6 animate-fadeInUp">
              "The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt
            </p>
            <div className="w-48 h-1 bg-white/50 rounded-full"></div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 mb-8">Enter your credentials to access your account.</p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Gmail Address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  name="email"
                  autoComplete="email username"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  name="current-password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowForgot(true); setFpStep('email'); setFpEmail(email || ''); }}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    <LogIn className="mr-2" size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>


            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>

            {/* Forgot Password Modal */}
            {showForgot && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
                  <button
                    type="button"
                    onClick={() => { setShowForgot(false); setFpStep('email'); setFpEmail(''); setFpOtp(''); setFpNewPassword(''); setFpConfirmPassword(''); }}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                  <h3 className="text-xl font-semibold mb-1">Forgot Password</h3>
                  <p className="text-sm text-gray-500 mb-4">{fpStep === 'email' ? 'Enter your registered email to receive an OTP' : 'Enter the OTP and set a new password'}</p>

                  {fpStep === 'email' ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          value={fpEmail}
                          onChange={(e) => setFpEmail(e.target.value)}
                          placeholder="Gmail Address"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={fpLoading}
                        onClick={async () => {
                          if (!fpEmail) return toast.error('Please enter your email');
                          try {
                            setFpLoading(true);
                            await api.post('/api/v1/auth/forgot-password-otp', { email: fpEmail });
                            toast.success('OTP sent to your email');
                            setFpStep('otp');
                          } catch (err: any) {
                            toast.error(err?.response?.data?.message || 'Could not send OTP');
                          } finally {
                            setFpLoading(false);
                          }
                        }}
                        className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition ${fpLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {fpLoading ? 'Sending...' : 'Send OTP'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">OTP</label>
                        <input
                          type="text"
                          value={fpOtp}
                          onChange={(e) => setFpOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          value={fpNewPassword}
                          onChange={(e) => setFpNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoComplete="new-password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={fpConfirmPassword}
                          onChange={(e) => setFpConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoComplete="new-password"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={fpLoading}
                        onClick={async () => {
                          if (!fpOtp || !fpNewPassword || !fpConfirmPassword) {
                            return toast.error('Please fill all fields');
                          }
                          if (fpNewPassword !== fpConfirmPassword) {
                            return toast.error('Passwords do not match');
                          }
                          try {
                            setFpLoading(true);
                            await api.post('/api/v1/auth/reset-password-otp', {
                              email: fpEmail,
                              otp: fpOtp,
                              password: fpNewPassword,
                              passwordConfirm: fpConfirmPassword,
                            });
                            toast.success('Password reset successful. You can log in now.');
                            setShowForgot(false);
                            setFpStep('email');
                            setFpEmail('');
                            setFpOtp('');
                            setFpNewPassword('');
                            setFpConfirmPassword('');
                          } catch (err: any) {
                            toast.error(err?.response?.data?.message || 'Failed to reset password');
                          } finally {
                            setFpLoading(false);
                          }
                        }}
                        className={`w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition ${fpLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {fpLoading ? 'Resetting...' : 'Reset Password'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFpStep('email')}
                        className="w-full text-sm text-blue-600 hover:underline"
                      >
                        Back
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
