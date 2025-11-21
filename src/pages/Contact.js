import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, MessageCircle, Github, Linkedin, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://primequillacademy.onrender.com/api/contact/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          subject: data.subject,
          message: data.message
        })
      });
      
      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try WhatsApp or direct email.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-charcoal mb-4">Get In Touch</h1>
        <p className="text-xl text-slate">Ready to start your project? Let's discuss your ideas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-charcoal mb-6">Let's Work Together</h2>
          <p className="text-gray-600 mb-8">
            I'm always excited to work on new projects and help bring your ideas to life. 
            Whether you need a simple website or a complex application, I'm here to help.
          </p>

          <div className="space-y-6">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-accent-teal mr-4" />
              <div>
                <h3 className="font-semibold text-charcoal">Email</h3>
                <p className="text-gray-600">hello@freelancer.dev</p>
              </div>
            </div>

            <div className="flex items-center">
              <Phone className="w-6 h-6 text-accent-teal mr-4" />
              <div>
                <h3 className="font-semibold text-charcoal">Phone</h3>
                <div className="text-gray-600">
                  <div>+254 704 258 346</div>
                  <div>+254 740 168 705</div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-accent-teal mr-4" />
              <div>
                <h3 className="font-semibold text-charcoal">Location</h3>
                <p className="text-gray-600">Nairobi, Kenya</p>
              </div>
            </div>

            <div className="flex items-center">
              <MessageCircle className="w-6 h-6 text-accent-teal mr-4" />
              <div>
                <h3 className="font-semibold text-charcoal">WhatsApp</h3>
                <div className="space-y-1">
                  <a 
                    href="https://wa.me/254704258346" 
                    className="text-accent-teal hover:text-teal-600 block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    0704 258 346
                  </a>
                  <a 
                    href="https://wa.me/254703859508" 
                    className="text-accent-teal hover:text-teal-600 block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    0703 859 508
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-charcoal mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-accent-teal">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-accent-teal">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-accent-teal">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Send Me a Message</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                placeholder="Project inquiry"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-accent-teal text-white py-3 px-6 rounded-md hover:bg-teal-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent-teal to-soft-blue text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Prefer a Quick Chat?</h2>
        <p className="text-lg mb-6">
          Sometimes it's easier to just talk. Click below to start a WhatsApp conversation.
        </p>
        <a
          href="https://wa.me/254704258346?text=Hi! I'm interested in discussing a project."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-accent-teal px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold inline-flex items-center"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Contact;