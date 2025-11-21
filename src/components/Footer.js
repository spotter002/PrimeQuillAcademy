import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">PrimeQuillAcademy</h3>
            <p className="text-gray-300 mb-4">
              Excellence in Every Word, Innovation in Every Code. 
              Professional essay writing and programming services with AI-powered refinement.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Post Project
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Essay Writing</li>
              <li>Research Papers</li>
              <li>Web Development</li>
              <li>Mobile Apps</li>
              <li>AI/ML Solutions</li>
              <li>E-commerce</li>
              <li>API Development</li>
              <li>Database Design</li>
              <li>Cybersecurity</li>
              <li>Enterprise Systems</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-300">elijahspotter@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-indigo-400" />
                <div className="text-gray-300">
                  <div>+254 704 258 346</div>
                  <div>+254 740 168 705</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-gray-300">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PrimeQuillAcademy. All rights reserved. Built with ❤️ by Elijah Potter
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;