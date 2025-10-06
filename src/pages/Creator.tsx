import React from 'react';
import { Github, Linkedin, Twitter, Mail, Code2, BookOpen, Trophy, Award, Star, Code } from 'lucide-react';

export default function Creator() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">Meet the Creator</h1>
          <p className="text-xl md:text-2xl text-gray-600">The mind behind DSA Algo</p>
        </div>

        {/* Creator Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-50 shadow-lg rounded-xl p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Code2 className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Adarsh Priyadarshi</h2>
              <p className="text-gray-600">Full Stack Developer & AI/ML Enthusiast || Problem Solver</p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Passionate about creating tools that help developers, 
                I built DSA Algo to make DSA learning more accessible and engaging.
              </p>
              
              <div className="flex justify-center space-x-4 mt-6">
                <a href="https://github.com/adarsh-priydarshi-5646" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/adarsh-priydarshi-536430316/" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:adarshpriydarshi5646@gmail.com" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Skills and Achievements */}
          <div className="space-y-6">
            <div className="bg-gray-50 shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-600">React</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-600">JavaScript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-600">TypeScript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-600">Python</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-600">DSA</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Codeforces Rating</h4>
                    <p className="text-sm text-gray-600">Rating: 550+</p>
                  </div>
                   <div>
                    <h4 className="font-medium text-gray-900">CodeChef Rating</h4>
                    <p className="text-sm text-gray-600">Rating: 1 ⭐️</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Open Source Contributor</h4>
                    <p className="text-sm text-gray-600">Multiple projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "DSA Algo",
                description: "A comprehensive platform for learning Data Structures and Algorithms",
                icon: <Code className="w-6 h-6 text-purple-600" />
              },
              {
                title: "Code Runner",
                description: "Online code execution platform with multiple language support",
                icon: <Code2 className="w-6 h-6 text-purple-600" />
              }
            ].map((project, index) => (
              <div key={index} className="bg-gray-50 shadow-lg rounded-xl p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  {project.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "DSA Algo has completely transformed how I learn algorithms. The interactive approach makes it so much easier to understand complex concepts.",
                author: "Sarah Johnson",
                role: "Software Engineer"
              },
              {
                quote: "The best platform for DSA preparation. The practice problems and explanations are top-notch.",
                author: "Michael Chen",
                role: "Competitive Programmer"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 shadow-lg rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
