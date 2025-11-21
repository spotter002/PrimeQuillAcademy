import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Zap, Eye, FileText, Star } from 'lucide-react';

const Pricing = () => {
  const packages = [
    {
      name: 'Normal',
      price: 0,
      description: 'Standard project delivery',
      features: [
        'Quality code delivery',
        'Basic support',
        'Standard timeline',
        'Email communication'
      ],
      icon: Star,
      popular: false
    },
    {
      name: 'NDA Package',
      price: 3303.90,
      description: 'Non-disclosure agreement included',
      features: [
        'Everything in Normal',
        'Signed NDA protection',
        'Confidential file access',
        'Secure communication'
      ],
      icon: Shield,
      popular: false
    },
    {
      name: 'IP Agreement',
      price: 3303.90,
      description: 'Full intellectual property transfer',
      features: [
        'Everything in Normal',
        'Complete IP ownership',
        'Legal documentation',
        'Source code rights'
      ],
      icon: FileText,
      popular: false
    },
    {
      name: 'Urgent',
      price: 1500.95,
      description: 'High-priority fast delivery',
      features: [
        'Everything in Normal',
        'Priority development',
        'Faster turnaround',
        'Daily progress updates'
      ],
      icon: Zap,
      popular: true
    },
    {
      name: 'Private',
      price: 3303.90,
      description: 'Completely confidential project',
      features: [
        'Everything in Normal',
        'Hidden from public view',
        'Private communication',
        'Exclusive attention'
      ],
      icon: Eye,
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-charcoal mb-4">Pricing Packages</h1>
        <p className="text-xl text-slate">Choose the package that fits your project needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-lg p-8 relative ${pkg.popular ? 'ring-2 ring-accent-teal' : ''}`}>
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent-teal text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <pkg.icon className="w-12 h-12 text-accent-teal mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-charcoal mb-2">{pkg.name}</h3>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <div className="text-3xl font-bold text-accent-teal">
                {pkg.price === 0 ? 'Free' : `KSh ${pkg.price.toLocaleString()}`}
              </div>
              {pkg.price > 0 && <p className="text-sm text-gray-500">+ base project cost</p>}
            </div>
            
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-accent-teal mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link
              to="/quote"
              className={`w-full py-3 px-6 rounded-md text-center block transition-colors ${
                pkg.popular 
                  ? 'bg-accent-teal text-white hover:bg-teal-600' 
                  : 'border border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-white'
              }`}
            >
              Choose {pkg.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">Payment Terms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-charcoal mb-3">Payment Schedule</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 50% upfront payment to start</li>
              <li>• 50% upon project completion</li>
              <li>• Packages paid with initial payment</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal mb-3">Accepted Methods</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• M-Pesa (Kenya)</li>
              <li>• Bank Transfer</li>
              <li>• PayPal</li>
              <li>• Cryptocurrency</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-accent-teal to-soft-blue text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Package?</h2>
        <p className="text-lg mb-6">Every project is unique. Let's discuss your specific requirements.</p>
        <Link
          to="/contact"
          className="bg-white text-accent-teal px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
};

export default Pricing;