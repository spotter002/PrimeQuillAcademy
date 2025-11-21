import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Target, CheckCircle } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  
  // Mock project data - in real app, fetch by ID
  const project = {
    title: 'E-Commerce Platform',
    client: 'TechStore Kenya',
    duration: '6 weeks',
    overview: 'A comprehensive e-commerce platform built for a growing electronics retailer in Kenya.',
    problem: 'The client was losing customers due to their outdated website and lack of mobile optimization.',
    solution: 'Built a modern, responsive e-commerce platform with advanced features and seamless payment integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    features: [
      'Responsive design for all devices',
      'Secure payment processing',
      'Inventory management system',
      'Customer reviews and ratings',
      'Admin dashboard',
      'Email notifications'
    ],
    results: [
      '300% increase in online sales',
      '50% reduction in bounce rate',
      '95% customer satisfaction score',
      'Mobile traffic increased by 200%'
    ],
    testimonial: {
      text: 'Working with this developer was exceptional. The platform exceeded our expectations and our sales have tripled since launch.',
      author: 'John Kamau, CEO TechStore Kenya'
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/portfolio" className="flex items-center text-accent-teal hover:text-teal-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Portfolio
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-lg">Project Screenshots</span>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-charcoal mb-2">{project.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {project.client}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {project.duration}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold text-charcoal mb-4">Project Overview</h2>
              <p className="text-gray-600 mb-6">{project.overview}</p>
              
              <h3 className="text-lg font-semibold text-charcoal mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-red-500" />
                The Problem
              </h3>
              <p className="text-gray-600 mb-6">{project.problem}</p>
              
              <h3 className="text-lg font-semibold text-charcoal mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                The Solution
              </h3>
              <p className="text-gray-600">{project.solution}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, index) => (
                  <span key={index} className="bg-soft-blue bg-opacity-10 text-soft-blue px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold text-charcoal mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-accent-teal mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-charcoal mb-4">Results Achieved</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.results.map((result, index) => (
                <div key={index} className="flex items-center text-accent-teal font-semibold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {result}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent-teal to-soft-blue text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Client Testimonial</h3>
            <p className="text-lg italic mb-3">"{project.testimonial.text}"</p>
            <p className="font-semibold">— {project.testimonial.author}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-charcoal mb-4">Ready to Start Your Project?</h2>
        <Link
          to="/quote"
          className="bg-accent-teal text-white px-8 py-3 rounded-md hover:bg-teal-600 transition-colors"
        >
          Get Your Quote
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;