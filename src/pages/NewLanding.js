import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Zap, Shield, Clock, MessageSquare, FileText, Star, ArrowRight, DollarSign, Calendar, Code, Calculator, Sparkles, Smartphone, BookOpen, Award, Users, TrendingUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { toolsAPI, jobAPI, aiAPI } from '../services/api';
import toast from 'react-hot-toast';
import axios from 'axios';

const NewLanding = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [activeQuoteTab, setActiveQuoteTab] = useState('essay');
  const [loading, setLoading] = useState(false);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const essayForm = watch();

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs/featured');
        setFeaturedJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch featured jobs:', error);
      }
    };
    fetchFeaturedJobs();
  }, []);

  useEffect(() => {
    if (activeQuoteTab === 'essay' && essayForm.pages && essayForm.academicLevel && essayForm.deadline) {
      const calculatePrice = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/tools/price-calculator', {
            pages: parseInt(essayForm.pages) || 1,
            academicLevel: essayForm.academicLevel,
            deadline: parseInt(essayForm.deadline) || 24,
            writerType: essayForm.writerType || 'ESL'
          });
          setPriceEstimate(response.data);
        } catch (error) {
          console.error('Price calculation error:', error);
        }
      };
      calculatePrice();
    }
  }, [essayForm.pages, essayForm.academicLevel, essayForm.deadline, essayForm.writerType, activeQuoteTab]);

  const onSubmitEssay = async (data) => {
    if (!user) {
      toast.error('Please sign in to request a quote');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        title: `${data.essayType} - ${data.academicLevel}`,
        originalIdea: data.description,
        category: 'writing',
        academicLevel: data.academicLevel,
        pages: parseInt(data.pages),
        deadline: new Date(Date.now() + parseInt(data.deadline) * 60 * 60 * 1000),
        writerType: data.writerType,
        budgetMin: priceEstimate?.totalPrice || 5000,
        budgetMax: (priceEstimate?.totalPrice || 5000) * 1.2,
        biddingEnabled: true,
        guarantees: {
          moneyBack: true,
          freeRevisions: true,
          plagiarismFree: true,
          confidentiality: true
        }
      };

      await jobAPI.create(jobData);
      toast.success('Essay request submitted successfully!');
      reset();
      setPriceEstimate(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitProgramming = async (data) => {
    if (!user) {
      toast.error('Please sign in to request a quote');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        title: data.title,
        originalIdea: data.description,
        category: data.category,
        budgetMin: parseInt(data.budget) * 0.8,
        budgetMax: parseInt(data.budget) * 1.2,
        deadline: new Date(Date.now() + parseInt(data.timeline) * 24 * 60 * 60 * 1000),
        skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [],
        biddingEnabled: true
      };

      await jobAPI.create(jobData);
      toast.success('Programming project submitted successfully!');
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">PrimeQuill</span>
                  <span className="text-gray-900">Academy</span>
                </h1>
                <p className="text-lg text-indigo-600 font-medium italic">"Excellence in Every Word, Innovation in Every Code"</p>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Premium Academic & Programming Services
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> That Deliver Results</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed">
              At PrimeQuillAcademy, we bridge the gap between academic excellence and technological innovation. Whether you need a meticulously researched essay, a cutting-edge web application, or a comprehensive mobile solution, our expert team delivers premium quality work that exceeds expectations. We combine traditional academic rigor with modern technological expertise to provide you with services that not only meet your immediate needs but also contribute to your long-term success.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-indigo-100 text-center">
                <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Expert Support Available</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-100 text-center">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Money-Back Guarantee</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-pink-100 text-center">
                <Star className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Successful Projects</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-indigo-100 text-center">
                <Award className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('quote-section').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Start Your Success Story
                <ArrowRight className="w-6 h-6" />
              </button>
              <Link to="/login" className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why PrimeQuillAcademy Stands Above the Rest</h2>
            <p className="text-xl text-gray-600 mb-6">Six pillars of excellence that define our commitment to your success</p>
            <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
              In a crowded marketplace of service providers, PrimeQuillAcademy distinguishes itself through unwavering commitment to quality, innovation, and client satisfaction. Our comprehensive approach combines academic excellence with technological expertise, ensuring that every project we deliver not only meets your immediate requirements but also contributes to your long-term academic and professional growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-indigo-100 text-center hover:shadow-2xl transition-all duration-300">
              <DollarSign className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent & Affordable Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe quality education and professional services should be accessible to everyone. Our competitive pricing structure is completely transparent with no hidden fees, surprise charges, or last-minute add-ons. You know exactly what you're paying for, and you get exceptional value for every shilling invested.
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-100 text-center hover:shadow-2xl transition-all duration-300">
              <Clock className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning-Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Time is precious, especially when deadlines are approaching. Our streamlined workflow and dedicated team of experts enable us to deliver high-quality work in record time. From urgent 6-hour essays to complex programming projects, we consistently meet even the most challenging deadlines without compromising on quality.
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-100 text-center hover:shadow-2xl transition-all duration-300">
              <CheckCircle className="w-12 h-12 text-pink-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Uncompromising Quality Standards</h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece of work that leaves our platform undergoes rigorous quality control processes. We guarantee 100% original, plagiarism-free content created by subject matter experts. Our multi-tier review system ensures that grammar, structure, technical accuracy, and adherence to requirements are all perfect before delivery.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100 text-center hover:shadow-2xl transition-all duration-300">
              <MessageSquare className="w-12 h-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seamless Communication</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience the power of direct, real-time communication with your assigned expert. Our secure messaging platform allows you to share additional requirements, ask questions, provide feedback, and track progress throughout the entire project lifecycle. No intermediaries, no delays — just clear, efficient communication.
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-100 text-center hover:shadow-2xl transition-all duration-300">
              <Shield className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-Level Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Your financial security and personal privacy are our top priorities. Our platform uses advanced encryption, secure escrow systems, and multiple payment options to ensure your transactions are completely safe. Your personal information is protected with the same security standards used by major financial institutions.
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-yellow-100 text-center hover:shadow-2xl transition-all duration-300">
              <FileText className="w-12 h-12 text-yellow-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unlimited Revisions & Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Your satisfaction is our ultimate goal. We include unlimited revisions within the agreed scope to ensure the final product perfectly matches your expectations. Additionally, our support team provides ongoing assistance even after project completion, ensuring you have everything you need for success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How PrimeQuillAcademy Works</h2>
            <p className="text-xl text-gray-600 mb-6">Our streamlined 4-step process ensures exceptional results every time</p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We've perfected our workflow over thousands of successful projects. From the moment you submit your requirements to the final delivery, every step is designed to maximize quality, minimize stress, and ensure your complete satisfaction. Our process combines cutting-edge technology with human expertise to deliver results that consistently exceed expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Your Project Requirements</h3>
              <p className="text-gray-600 leading-relaxed">
                Begin your journey by providing detailed information about your project. Whether it's an academic paper, a complex programming task, or a creative writing assignment, our intelligent system analyzes your requirements and provides an instant, transparent quote. No hidden fees, no surprises — just honest pricing based on the scope and complexity of your work.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Payment & Expert Assignment</h3>
              <p className="text-gray-600 leading-relaxed">
                Once you approve the quote, make your payment through our secure, encrypted payment system that supports multiple methods including M-Pesa, bank transfers, and international options. Your project is immediately assigned to our most qualified expert based on subject matter, experience level, and current workload to ensure optimal results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-600 to-red-500 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Collaboration & Progress Updates</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience unprecedented transparency as work begins immediately. Communicate directly with your assigned expert through our secure messaging system, receive regular progress updates, and provide feedback in real-time. Our collaborative approach ensures that the final product aligns perfectly with your vision and requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Review & Final Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Before delivery, every project undergoes our rigorous quality assurance process including plagiarism checks, technical reviews, and formatting verification. You receive your completed work along with any additional materials like source code, references, or documentation. Unlimited revisions are included to ensure your complete satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Me Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600/5 to-blue-600/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Work With Me?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">5+ Years Experience</h3>
                    <p className="text-gray-600">Proven track record in web development, mobile apps, and digital solutions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">100% Client Satisfaction</h3>
                    <p className="text-gray-600">Every project delivered on time with complete client satisfaction guaranteed.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">24/7 Communication</h3>
                    <p className="text-gray-600">Real-time updates and constant communication throughout your project.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Complete Documentation</h3>
                    <p className="text-gray-600">Full project documentation and source code with lifetime support.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
              <p className="text-gray-600 mb-6">Join hundreds of satisfied clients who have transformed their ideas into successful projects.</p>
              <button 
                onClick={() => document.getElementById('quote-section').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Your Success Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {featuredJobs.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Projects</h2>
              <p className="text-xl text-gray-600">See what clients are looking for</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredJobs.map((job) => (
                <div key={job._id} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {job.title}
                    </h3>
                    {job.upgrades?.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full ml-2">
                        Urgent
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.finalDescription || job.originalIdea}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>
                        KSh {job.budgetMin?.toLocaleString()} - {job.budgetMax?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Posted by {job.clientId?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button 
                onClick={() => document.getElementById('quote-section').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Transform Your Ideas Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Clients Say</h2>
            <p className="text-xl text-gray-600">Testimonials from satisfied clients</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Elijah delivered an exceptional e-commerce platform that exceeded our expectations. 
                The AI integration was seamless and the project was completed ahead of schedule."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Mitchell</h4>
                  <p className="text-gray-600 text-sm">CEO, TechStart Kenya</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Outstanding mobile app development! The banking app is secure, user-friendly, 
                and has received excellent feedback from our customers. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JK
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">James Kariuki</h4>
                  <p className="text-gray-600 text-sm">CTO, FinanceHub</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Professional, reliable, and innovative. Elijah transformed our complex data 
                into beautiful, actionable insights. The dashboard is exactly what we needed."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AM
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alice Mwangi</h4>
                  <p className="text-gray-600 text-sm">Director, DataViz Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services Offered</h2>
            <p className="text-xl text-gray-600">Complete range of professional services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <FileText className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Essay Writing</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Research papers</li>
                <li>• Argumentative essays</li>
                <li>• Thesis writing</li>
                <li>• Coursework</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Code className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Web Development</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full-stack applications</li>
                <li>• E-commerce sites</li>
                <li>• Custom dashboards</li>
                <li>• API development</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Smartphone className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Mobile Apps</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• iOS & Android apps</li>
                <li>• Cross-platform</li>
                <li>• UI/UX design</li>
                <li>• App store deployment</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Zap className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">AI/ML Solutions</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Chatbots & AI agents</li>
                <li>• Data analysis</li>
                <li>• Automation scripts</li>
                <li>• Custom AI models</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio/Work Samples Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Portfolio & Work Samples</h2>
            <p className="text-xl text-gray-600">See the quality of work you can expect</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                <Code className="w-16 h-16 text-teal-600" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">E-commerce Platform</h3>
                <p className="text-gray-600 text-sm mb-3">Full-stack e-commerce solution with payment integration</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>React + Node.js</span>
                  <span>2,500 words docs</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <FileText className="w-16 h-16 text-purple-600" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Research Paper</h3>
                <p className="text-gray-600 text-sm mb-3">Masters level research on AI in healthcare</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>15 pages</span>
                  <span>4,200 words</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                <Smartphone className="w-16 h-16 text-green-600" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Banking Mobile App</h3>
                <p className="text-gray-600 text-sm mb-3">Secure mobile banking with biometric authentication</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Flutter</span>
                  <span>Complete docs</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/samples" className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Our Complete Portfolio
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600/5 to-blue-600/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600">No hidden fees, clear pricing structure</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Essay Writing</h3>
              <div className="text-2xl font-bold text-purple-600 mb-2">From KSh 800</div>
              <p className="text-sm text-gray-600 mb-4">per page</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ Free revisions</li>
                <li>✓ Plagiarism report</li>
                <li>✓ 24/7 support</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Code className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Web Development</h3>
              <div className="text-2xl font-bold text-teal-600 mb-2">From KSh 50,000</div>
              <p className="text-sm text-gray-600 mb-4">per project</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ Full documentation</li>
                <li>✓ Source code</li>
                <li>✓ Lifetime support</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mobile Apps</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">From KSh 80,000</div>
              <p className="text-sm text-gray-600 mb-4">per app</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ iOS & Android</li>
                <li>✓ App store ready</li>
                <li>✓ Maintenance included</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Calculator className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Quote</h3>
              <div className="text-2xl font-bold text-yellow-600 mb-2">Get Quote</div>
              <p className="text-sm text-gray-600 mb-4">tailored pricing</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ Custom requirements</li>
                <li>✓ Flexible timeline</li>
                <li>✓ Dedicated support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How fast can you deliver my project?</h3>
              <p className="text-gray-600">Essays: 6-24 hours. Programming projects: 1-4 weeks depending on complexity. Rush orders available.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">M-Pesa, bank transfer, PayPal, Stripe, and cryptocurrency (BTC, USDT). Secure escrow payment system.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you guarantee quality?</h3>
              <p className="text-gray-600">Yes! 100% original work, plagiarism-free guarantee, unlimited revisions, and money-back guarantee if not satisfied.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I communicate directly with you?</h3>
              <p className="text-gray-600">Absolutely! Real-time chat, progress updates, and direct communication throughout the entire project.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is my data safe and private?</h3>
              <p className="text-gray-600">Complete confidentiality guaranteed. Your data is encrypted, secure, and deleted after project completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote-section" className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Quote</h2>
            <p className="text-xl text-gray-600">Choose your service and get started today</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className={`relative p-8 rounded-xl transition-all duration-300 cursor-pointer ${activeQuoteTab === 'essay' ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl' : 'bg-white/80 hover:bg-white shadow-lg'}`} onClick={() => setActiveQuoteTab('essay')}>
              <FileText className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Essay Writing</h3>
              <p className="mb-4">Professional essay writing with guaranteed quality and plagiarism-free content.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>ESL & Native English Writers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free Revisions & Money-Back</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Confidential & Secure</span>
                </div>
              </div>
              {priceEstimate && activeQuoteTab === 'essay' && (
                <div className="mt-4 p-3 bg-white/20 rounded-lg">
                  <div className="text-lg font-bold">KSh {priceEstimate.totalPrice.toLocaleString()}</div>
                  <div className="text-sm opacity-75">KSh {priceEstimate.pricePerPage.toLocaleString()} per page</div>
                </div>
              )}
            </div>

            <div className={`relative p-8 rounded-xl transition-all duration-300 cursor-pointer ${activeQuoteTab === 'programming' ? 'bg-gradient-to-br from-teal-600 to-blue-600 text-white shadow-xl' : 'bg-white/80 hover:bg-white shadow-lg'}`} onClick={() => setActiveQuoteTab('programming')}>
              <Code className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Programming Services</h3>
              <p className="mb-4">AI-powered project refinement and expert development services.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>AI-Powered Refinement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Enterprise Solutions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeQuoteTab === 'essay' ? (
              <form onSubmit={handleSubmit(onSubmitEssay)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Essay Type</label>
                    <select {...register('essayType', { required: 'Essay type is required' })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option value="">Select essay type</option>
                      <option value="argumentative">Argumentative Essay</option>
                      <option value="research">Research Paper</option>
                      <option value="thesis">Thesis</option>
                    </select>
                    {errors.essayType && <p className="text-red-500 text-sm mt-1">{errors.essayType.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                    <select {...register('academicLevel', { required: 'Academic level is required' })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option value="">Select level</option>
                      <option value="high_school">High School</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="masters">Masters</option>
                      <option value="phd">PhD</option>
                    </select>
                    {errors.academicLevel && <p className="text-red-500 text-sm mt-1">{errors.academicLevel.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                    <input {...register('pages', { required: 'Pages required', min: 1 })} type="number" min="1" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., 5" />
                    {errors.pages && <p className="text-red-500 text-sm mt-1">{errors.pages.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (hours)</label>
                    <select {...register('deadline', { required: 'Deadline is required' })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                      <option value="">Select deadline</option>
                      <option value="24">24 hours</option>
                      <option value="48">2 days</option>
                      <option value="168">1 week</option>
                    </select>
                    {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea {...register('description', { required: 'Description is required' })} rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Describe your essay requirements..." />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center">
                  {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><FileText className="w-5 h-5 mr-2" />Submit Essay Request</>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmitProgramming)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input {...register('title', { required: 'Title is required' })} type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="e.g., E-commerce Website" />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select {...register('category', { required: 'Category is required' })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                      <option value="">Select category</option>
                      <option value="web_development">Web Development</option>
                      <option value="mobile_apps">Mobile App Development</option>
                      <option value="programming">Cloud & DevOps</option>
                      <option value="cybersecurity">API & Integrations</option>
                      <option value="ai_ml">Database & Data Engineering</option>
                      <option value="game_dev">Automation & Scripting</option>
                      <option value="enterprise_systems">Cybersecurity & Ethical Hacking</option>
                      <option value="programming">AI/ML Solutions</option>
                      <option value="game_dev">Game & Interactive Media</option>
                      <option value="enterprise_systems">Enterprise Systems</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (KSh)</label>
                    <input {...register('budget', { required: 'Budget is required', min: 1000 })} type="number" min="1000" step="1000" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="50000" />
                    {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                  <textarea {...register('description', { required: 'Description is required' })} rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="Describe your project idea..." />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-teal-800 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">AI Enhancement</span>
                  </div>
                  <p className="text-sm text-teal-700">Our AI will refine your project description and provide detailed requirements.</p>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center">
                  {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <><Sparkles className="w-5 h-5 mr-2" />Submit for AI Refinement</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewLanding;