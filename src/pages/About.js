import React from 'react';
import { PenTool, Award, Calendar, Heart, BookOpen, GraduationCap } from 'lucide-react';

const About = () => {
  const skills = ['Academic Writing', 'Research Papers', 'Essays', 'Dissertations', 'APA/MLA/Chicago', 'Proofreading'];
  const experience = [
    { year: '2020-Present', role: 'Senior Academic Writer', company: 'Freelance Platform' },
    { year: '2018-2020', role: 'Research Assistant', company: 'University Research Center' },
    { year: '2016-2018', role: 'Writing Tutor', company: 'Academic Writing Center' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-charcoal mb-4">About Our Writer</h1>
        <p className="text-xl text-slate">Crafting exceptional academic content with precision and expertise</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-charcoal mb-4">My Story</h2>
          <p className="text-gray-600 mb-4">
            I'm a dedicated academic writer with over 6 years of experience helping students 
            achieve their educational goals. With a Master's degree in English Literature and 
            extensive research background, I specialize in creating high-quality essays, 
            research papers, and dissertations across various disciplines.
          </p>
          <p className="text-gray-600">
            My passion lies in transforming complex ideas into clear, compelling academic 
            content that meets the highest standards of scholarly writing. I've successfully 
            completed over 1,000 projects with a 98% client satisfaction rate.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-charcoal mb-4 flex items-center">
            <PenTool className="w-5 h-5 mr-2 text-accent-teal" />
            Writing Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-accent-teal bg-opacity-10 text-accent-teal px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-accent-teal" />
          Professional Journey
        </h2>
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-charcoal">{exp.role}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <span className="text-sm text-accent-teal font-medium">{exp.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-charcoal mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-accent-teal" />
            Education & Credentials
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Master's in English Literature</li>
            <li>• Bachelor's in Communications</li>
            <li>• Certified Academic Writing Specialist</li>
            <li>• Published researcher in peer-reviewed journals</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-charcoal mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-accent-teal" />
            Specializations
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Literature & Literary Analysis</li>
            <li>• History & Social Sciences</li>
            <li>• Business & Management</li>
            <li>• Psychology & Education</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent-teal to-soft-blue text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Heart className="w-6 h-6 mr-2" />
          Why I Love Academic Writing
        </h2>
        <p className="text-lg">
          Every essay is an opportunity to explore new ideas and help students express 
          their thoughts clearly and persuasively. I'm passionate about academic excellence 
          and committed to helping students succeed in their educational journey.
        </p>
      </div>
    </div>
  );
};

export default About;