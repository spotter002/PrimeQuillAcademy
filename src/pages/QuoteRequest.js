import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FileText, Code, Calculator, Sparkles, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toolsAPI, jobAPI, aiAPI } from '../services/api';
import toast from 'react-hot-toast';

const QuoteRequest = () => {
  const [activeTab, setActiveTab] = useState('essay');
  const [loading, setLoading] = useState(false);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const essayForm = watch();
  const programmingForm = watch();

  // Calculate essay price in real-time
  React.useEffect(() => {
    if (activeTab === 'essay' && essayForm.pages && essayForm.academicLevel && essayForm.deadline) {
      const calculatePrice = async () => {
        try {
          const response = await toolsAPI.priceCalculator({
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
  }, [essayForm.pages, essayForm.academicLevel, essayForm.deadline, essayForm.writerType, activeTab]);

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
        biddingEnabled: true,
        guarantees: {
          moneyBack: true,
          freeRevisions: true,
          plagiarismFree: true,
          confidentiality: true
        }
      };

      const response = await jobAPI.create(jobData);
      toast.success('Essay request submitted successfully!');
      navigate('/dashboard');
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
      // First, refine the idea with AI
      const aiResponse = await aiAPI.refine(data.description, [], {
        category: data.category,
        budget: data.budget,
        timeline: data.timeline
      });

      const jobData = {
        title: data.title,
        originalIdea: data.description,
        refinedIdea: aiResponse.data.refinedIdea,
        category: data.category,
        budgetMin: parseInt(data.budget) * 0.8,
        budgetMax: parseInt(data.budget) * 1.2,
        deadline: new Date(Date.now() + parseInt(data.timeline) * 24 * 60 * 60 * 1000),
        skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [],
        biddingEnabled: true
      };

      const response = await jobAPI.create(jobData);
      toast.success('Programming project submitted for AI refinement!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="glass rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[700px]">
            
            {/* Left Side - Essay Quote */}
            <div className={`relative transition-all duration-700 ${activeTab === 'programming' ? 'lg:order-2' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${
                activeTab === 'essay' 
                  ? 'from-purple-600 to-pink-600' 
                  : 'from-gray-400 to-gray-500 opacity-50'
              }`}></div>
              
              <div className="relative z-10 p-12 flex flex-col justify-center text-white h-full">
                <div className="mb-8">
                  <FileText className="w-12 h-12 mb-4 animate-pulse" />
                  <h1 className="text-4xl font-bold mb-4">Essay Writing Services</h1>
                  <p className="text-xl opacity-90 leading-relaxed">
                    Get professional essay writing help with guaranteed quality, plagiarism-free content, and on-time delivery.
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>ESL & Native English Writers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                    <span>Free Revisions & Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                    <span>Plagiarism-Free & Confidential</span>
                  </div>
                </div>

                {priceEstimate && activeTab === 'essay' && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">KSh {priceEstimate.totalPrice.toLocaleString()}</div>
                        <div className="text-sm opacity-75">KSh {priceEstimate.pricePerPage.toLocaleString()} per page</div>
                      </div>
                      <Calculator className="w-8 h-8 opacity-75" />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setActiveTab('essay')}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                    activeTab === 'essay'
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Request Essay Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Right Side - Programming Quote */}
            <div className={`relative transition-all duration-700 ${activeTab === 'essay' ? 'lg:order-2' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${
                activeTab === 'programming' 
                  ? 'from-teal-600 to-blue-600' 
                  : 'from-gray-400 to-gray-500 opacity-50'
              }`}></div>
              
              <div className="relative z-10 p-12 flex flex-col justify-center text-white h-full">
                <div className="mb-8">
                  <Code className="w-12 h-12 mb-4 animate-pulse" />
                  <h1 className="text-4xl font-bold mb-4">Programming Services</h1>
                  <p className="text-xl opacity-90 leading-relaxed">
                    Transform your ideas into reality with AI-powered project refinement and expert development services.
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>AI-Powered Project Refinement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
                    <span>Full-Stack Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                    <span>Enterprise-Grade Solutions</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('programming')}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                    activeTab === 'programming'
                      ? 'bg-white text-teal-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Code className="w-5 h-5 mr-2" />
                  Request Programming Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-12 bg-white">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {activeTab === 'essay' ? 'Essay Quote Request' : 'Programming Project Request'}
                </h2>
                <p className="text-gray-600">
                  {activeTab === 'essay' 
                    ? 'Fill in the details below to get an instant price quote for your essay'
                    : 'Describe your programming project and let our AI refine it for you'
                  }
                </p>
              </div>

              {activeTab === 'essay' ? (
                <form onSubmit={handleSubmit(onSubmitEssay)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Essay Type</label>
                      <select
                        {...register('essayType', { required: 'Essay type is required' })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select essay type</option>
                        <option value="argumentative">Argumentative Essay</option>
                        <option value="descriptive">Descriptive Essay</option>
                        <option value="narrative">Narrative Essay</option>
                        <option value="expository">Expository Essay</option>
                        <option value="research">Research Paper</option>
                        <option value="thesis">Thesis</option>
                      </select>
                      {errors.essayType && <p className="text-red-500 text-sm mt-1">{errors.essayType.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
                      <select
                        {...register('academicLevel', { required: 'Academic level is required' })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        <option value="high_school">High School</option>
                        <option value="undergraduate">Undergraduate</option>
                        <option value="masters">Masters</option>
                        <option value="phd">PhD</option>
                      </select>
                      {errors.academicLevel && <p className="text-red-500 text-sm mt-1">{errors.academicLevel.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Pages</label>
                      <input
                        {...register('pages', { required: 'Number of pages is required', min: 1 })}
                        type="number"
                        min="1"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., 5"
                      />
                      {errors.pages && <p className="text-red-500 text-sm mt-1">{errors.pages.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (hours)</label>
                      <select
                        {...register('deadline', { required: 'Deadline is required' })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select deadline</option>
                        <option value="6">6 hours (Rush)</option>
                        <option value="12">12 hours</option>
                        <option value="24">24 hours</option>
                        <option value="48">2 days</option>
                        <option value="72">3 days</option>
                        <option value="168">1 week</option>
                      </select>
                      {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Writer Type</label>
                      <select
                        {...register('writerType')}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="ESL">ESL Writer</option>
                        <option value="ENL">Native English Writer (+20%)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Essay Description</label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Describe your essay requirements, topic, and any specific instructions..."
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Submit Essay Request
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit(onSubmitProgramming)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      {...register('title', { required: 'Project title is required' })}
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., E-commerce Website Development"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        {...register('category', { required: 'Category is required' })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        <option value="web_development">Web Development</option>
                        <option value="mobile_apps">Mobile Apps</option>
                        <option value="programming">Programming</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="ai_ml">AI/ML</option>
                        <option value="game_dev">Game Development</option>
                        <option value="enterprise_systems">Enterprise Systems</option>
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget (KSh)</label>
                      <input
                        {...register('budget', { required: 'Budget is required', min: 1000 })}
                        type="number"
                        min="1000"
                        step="1000"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="e.g., 50000"
                      />
                      {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeline (days)</label>
                      <select
                        {...register('timeline', { required: 'Timeline is required' })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="7">1 week</option>
                        <option value="14">2 weeks</option>
                        <option value="30">1 month</option>
                        <option value="60">2 months</option>
                        <option value="90">3 months</option>
                      </select>
                      {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills Required</label>
                      <input
                        {...register('skills')}
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="e.g., React, Node.js, MongoDB"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Describe your project idea in detail. Our AI will help refine and improve your description..."
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                  </div>

                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-teal-800 mb-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-medium">AI Enhancement</span>
                    </div>
                    <p className="text-sm text-teal-700">
                      Our AI will automatically refine your project description, suggest improvements, and provide detailed requirements before posting to freelancers.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        Submit for AI Refinement
                        <Sparkles className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;