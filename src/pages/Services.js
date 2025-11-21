import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Globe, Zap, Clock, CheckCircle, Shield, Database, Cloud, Bot, Gamepad2, Building } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Full-stack web applications using modern technologies',
      includes: ['React/Next.js Frontend', 'Node.js Backend', 'Database Design', 'API Integration', 'Custom Dashboards', 'E-commerce Solutions'],
      price: 'From KSh 50,000',
      timeline: '2-4 weeks'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications',
      includes: ['Android (Java/Kotlin)', 'iOS (Swift)', 'React Native/Flutter', 'Mobile UI/UX', 'Offline-first Apps', 'App Store Deployment'],
      price: 'From KSh 80,000',
      timeline: '3-6 weeks'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Server setup, deployments, and cloud infrastructure',
      includes: ['AWS/GCP/Azure Setup', 'CI/CD Pipelines', 'Docker & Containers', 'Load Balancing', 'Server Monitoring', 'Backup Strategies'],
      price: 'From KSh 40,000',
      timeline: '1-3 weeks'
    },
    {
      icon: Code,
      title: 'API & Integrations',
      description: 'RESTful APIs and third-party integrations',
      includes: ['REST API Design', 'Payment Integrations (M-Pesa, Stripe)', 'SMS & WhatsApp APIs', 'Database Integration', 'Microservices', 'API Documentation'],
      price: 'From KSh 30,000',
      timeline: '1-2 weeks'
    },
    {
      icon: Database,
      title: 'Database & Data Engineering',
      description: 'Database design, optimization, and data processing',
      includes: ['MySQL/PostgreSQL/MongoDB', 'Data Modeling', 'Performance Optimization', 'ETL Pipelines', 'Data Sync Systems', 'High Availability'],
      price: 'From KSh 35,000',
      timeline: '1-2 weeks'
    },
    {
      icon: Zap,
      title: 'Automation & Scripting',
      description: 'Business workflow automation and custom scripts',
      includes: ['Cron Jobs & Scheduling', 'Workflow Automation', 'Web Scrapers & Bots', 'Report Generation', 'Task Automation', 'Custom Scripts'],
      price: 'From KSh 25,000',
      timeline: '1-2 weeks'
    },
    {
      icon: Shield,
      title: 'Cybersecurity & Ethical Hacking',
      description: 'Security audits, penetration testing, and hardening',
      includes: ['Penetration Testing', 'Vulnerability Audits', 'Server Hardening', 'OWASP Security Analysis', 'Social Engineering Training', 'Bug Fixing & Patching'],
      price: 'From KSh 60,000',
      timeline: '2-3 weeks'
    },
    {
      icon: Bot,
      title: 'AI/ML Solutions',
      description: 'AI-powered features and machine learning integration',
      includes: ['Chatbots & AI Agents', 'Recommendation Systems', 'OCR & Document AI', 'Predictive Analytics', 'LLM Integration', 'Custom AI Models'],
      price: 'From KSh 70,000',
      timeline: '3-4 weeks'
    },
    {
      icon: Gamepad2,
      title: 'Game & Interactive Media',
      description: 'Game development and interactive experiences',
      includes: ['Unity/Unreal Games', 'WebGL Applications', 'Gamified Experiences', 'Interactive Animations', 'Mobile Games', '2D/3D Graphics'],
      price: 'From KSh 90,000',
      timeline: '4-8 weeks'
    },
    {
      icon: Building,
      title: 'Enterprise Systems',
      description: 'Large-scale business management systems',
      includes: ['School Management Systems', 'HR & Payroll Systems', 'Inventory & POS', 'CRM & ERP Modules', 'Health Management', 'Logistics Systems'],
      price: 'From KSh 150,000',
      timeline: '6-12 weeks'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-charcoal mb-4">Programming & Software Development Services</h1>
        <p className="text-xl text-slate">High-impact, revenue-aligned, enterprise-grade coding solutions</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">Full-Stack Development</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Cloud Solutions</span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">AI/ML Integration</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enterprise Systems</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <service.icon className="w-8 h-8 text-accent-teal mr-3" />
              <h3 className="text-2xl font-bold text-charcoal">{service.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-6">{service.description}</p>
            
            <div className="mb-6">
              <h4 className="font-semibold text-charcoal mb-3">What's Included:</h4>
              <ul className="space-y-2">
                {service.includes.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-accent-teal mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-2xl font-bold text-accent-teal">{service.price}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.timeline}
                </p>
              </div>
            </div>
            
            <Link
              to="/quote"
              className="w-full bg-accent-teal text-white py-3 px-6 rounded-md hover:bg-teal-600 transition-colors text-center block"
            >
              Request This Service
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-charcoal mb-4">Need Something Custom?</h2>
        <p className="text-gray-600 mb-6">
          Don't see exactly what you're looking for? I love tackling unique challenges.
        </p>
        <Link
          to="/contact"
          className="bg-soft-blue text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Let's Discuss Your Project
        </Link>
      </div>
    </div>
  );
};

export default Services;