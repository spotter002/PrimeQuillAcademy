import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      image: '/api/placeholder/400/250',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      client: 'TechStore Kenya',
      results: '300% increase in online sales',
      rating: 5,
      testimonial: 'Exceptional work! The platform exceeded our expectations.'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Real-time collaborative task management with team features',
      image: '/api/placeholder/400/250',
      tech: ['React', 'Socket.IO', 'Express', 'PostgreSQL'],
      client: 'StartupXYZ',
      results: '50% improvement in team productivity',
      rating: 5,
      testimonial: 'Clean code, great communication, delivered on time.'
    },
    {
      id: 3,
      title: 'AI Content Generator',
      description: 'AI-powered content creation tool for marketers',
      image: '/api/placeholder/400/250',
      tech: ['Next.js', 'OpenAI API', 'Tailwind', 'Prisma'],
      client: 'Marketing Agency',
      results: '80% reduction in content creation time',
      rating: 5,
      testimonial: 'Revolutionary tool that transformed our workflow.'
    },
    {
      id: 4,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric auth',
      image: '/api/placeholder/400/250',
      tech: ['React Native', 'Firebase', 'Biometric Auth'],
      client: 'FinTech Startup',
      results: '10,000+ active users in first month',
      rating: 5,
      testimonial: 'Professional, secure, and user-friendly design.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-charcoal mb-4">My Portfolio</h1>
        <p className="text-xl text-slate">Recent projects that showcase my expertise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Project Screenshot</span>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-charcoal mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-charcoal mb-2">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="bg-soft-blue bg-opacity-10 text-soft-blue px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Client:</span> {project.client}
                </p>
                <p className="text-sm text-accent-teal font-semibold">
                  Result: {project.results}
                </p>
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded">
                <div className="flex items-center mb-2">
                  {[...Array(project.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">"{project.testimonial}"</p>
              </div>
              
              <div className="flex space-x-3">
                <Link
                  to={`/portfolio/${project.id}`}
                  className="flex-1 bg-accent-teal text-white py-2 px-4 rounded text-center hover:bg-teal-600 transition-colors"
                >
                  View Details
                </Link>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <Github className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center bg-gradient-to-r from-accent-teal to-soft-blue text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-lg mb-6">Let's create something amazing together</p>
        <Link
          to="/quote"
          className="bg-white text-accent-teal px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold"
        >
          Get Your Quote
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;