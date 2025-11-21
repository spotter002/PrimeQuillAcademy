import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, DollarSign, Calendar, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const Quote = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [files, setFiles] = useState([]);

  const projectTypes = [
    'Web Development',
    'Mobile App',
    'API Development',
    'AI Integration',
    'E-commerce',
    'Custom Software',
    'Other'
  ];

  const budgetRanges = [
    'Under KSh 50,000',
    'KSh 50,000 - 100,000',
    'KSh 100,000 - 250,000',
    'KSh 250,000 - 500,000',
    'KSh 500,000+',
    'Let\'s discuss'
  ];

  const timelines = [
    'ASAP (Rush job)',
    '1-2 weeks',
    '3-4 weeks',
    '1-2 months',
    '3+ months',
    'Flexible'
  ];

  const onSubmit = async (data) => {
    const quoteData = {
      ...data,
      files: files.map(f => f.name)
    };
    
    console.log('Quote request:', quoteData);
    toast.success('Quote request submitted! I\'ll get back to you within 24 hours.');
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-charcoal mb-4">Request a Quote</h1>
        <p className="text-xl text-slate">Tell me about your project and I'll provide a detailed quote</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company (Optional)
              </label>
              <input
                {...register('company')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                {...register('phone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                placeholder="+254 704 258 346"
              />
            </div>
          </div>

          {/* Project Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Type *
            </label>
            <select
              {...register('projectType', { required: 'Project type is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
            >
              <option value="">Select project type</option>
              {projectTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            {errors.projectType && (
              <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Budget Range *
              </label>
              <select
                {...register('budget', { required: 'Budget range is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Timeline *
              </label>
              <select
                {...register('timeline', { required: 'Timeline is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
              >
                <option value="">Select timeline</option>
                {timelines.map((timeline, index) => (
                  <option key={index} value={timeline}>{timeline}</option>
                ))}
              </select>
              {errors.timeline && (
                <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              {...register('description', { required: 'Project description is required' })}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
              placeholder="Describe your project in detail. What do you want to build? What features do you need? Any specific requirements?"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Upload className="w-4 h-4 mr-1" />
              Upload Files (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, Images, ZIP (Max 10MB each)
                </p>
              </label>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Requirements (Optional)
            </label>
            <textarea
              {...register('additionalRequirements')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
              placeholder="Any specific technologies, integrations, or special requirements?"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-charcoal mb-2">What happens next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• I'll review your requirements within 24 hours</li>
              <li>• You'll receive a detailed quote with timeline</li>
              <li>• We can schedule a call to discuss details</li>
              <li>• Once approved, I'll start working on your project</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-accent-teal text-white py-3 px-6 rounded-md hover:bg-teal-600 transition-colors flex items-center justify-center"
          >
            <FileText className="w-5 h-5 mr-2" />
            Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quote;