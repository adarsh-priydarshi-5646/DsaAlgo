import React, { useRef } from 'react';
import { ArrowRight, Brain, Code, Clock, Trophy, Sparkles, Zap, Target, BookOpen, Users, Github, Linkedin, Mail, Heart, Coffee, Rocket, Star, Award, CheckCircle, TrendingUp, Globe, Shield, Lightbulb, Database, Terminal, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import useAuthStore from '../store/authStore';

// Removed 3D components for better performance

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const heroRef = useRef();
  const featuresRef = useRef();
  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });

  const features = [
    {
      icon: Code,
      title: 'Interactive Problem Solving',
      description: 'Practice 500+ DSA problems with our advanced code editor and instant feedback',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Interview Preparation',
      description: 'Comprehensive interview questions and coding challenges from top tech companies',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Real-time analytics, leaderboards, and achievement system to monitor your growth',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Learning Community',
      description: 'Connect with 10K+ developers, share solutions, and learn together',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Problems', value: '500+', icon: BookOpen },
    { label: 'Students', value: '10K+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: Target },
    { label: 'Companies', value: '100+', icon: Trophy }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
          {/* Floating Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHeroInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4"
                >
                  <Brain className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                >
                  DSA Algo
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Master <span className="text-purple-400 font-semibold">Data Structures & Algorithms</span> with our comprehensive learning platform.
                  <br />
                  From <span className="text-blue-400 font-semibold">beginner-friendly tutorials</span> to <span className="text-cyan-400 font-semibold">advanced problem solving</span>.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2 rounded-full border border-green-500/20">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">FAANG Interview Ready</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300">Real-time Progress</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300">10K+ Active Learners</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-400">
                  <Rocket className="w-5 h-5 inline mr-2 text-yellow-400" />
                  Practice, Learn, Excel in Coding Interviews.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-2xl"
                  >
                    Continue Learning
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-2xl"
                    >
                      Start Learning
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/login"
                      className="backdrop-blur-lg bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20"
                  >
                    <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About DSA-Algo Platform Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                About <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">DSA-Algo Platform</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                A comprehensive learning ecosystem designed to transform your coding journey from beginner to expert level
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Platform Overview */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Platform Overview</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <p><span className="text-white font-semibold">Comprehensive Curriculum:</span> 500+ carefully curated problems covering all major DSA topics</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Terminal className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <p><span className="text-white font-semibold">Interactive Learning:</span> Real-time code execution with instant feedback and hints</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <GitBranch className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <p><span className="text-white font-semibold">Progressive Difficulty:</span> From basic concepts to advanced algorithmic challenges</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p><span className="text-white font-semibold">Industry Focused:</span> Problems sourced from top tech companies like Google, Amazon, Microsoft</p>
                  </div>
                </div>
              </motion.div>

              {/* Learning Path */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Learning Journey</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { phase: "Foundation", topics: "Arrays, Strings, Basic Math", color: "text-green-400" },
                    { phase: "Core Concepts", topics: "Linked Lists, Stacks, Queues, Trees", color: "text-blue-400" },
                    { phase: "Advanced Topics", topics: "Graphs, Dynamic Programming, Greedy", color: "text-purple-400" },
                    { phase: "Mastery Level", topics: "System Design, Optimization, Complex Algorithms", color: "text-yellow-400" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center text-sm font-bold ${item.color}`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${item.color}`}>{item.phase}</h4>
                        <p className="text-gray-400 text-sm">{item.topics}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Why Choose <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">DSA Algo?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the future of coding education with our comprehensive learning platform designed for interview success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer & Owner Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Meet the <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Creator</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Built with passion by a dedicated developer committed to making DSA learning accessible for everyone
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-12 border border-white/20 text-center"
            >
              <div className="flex flex-col items-center space-y-6">
                {/* Developer Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Developer Info */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">Adarsh Priydarshi</h3>
                  <p className="text-xl text-purple-300 font-semibold">Full-Stack Developer & DSA Enthusiast</p>
                  
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                      <Code className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300">MERN Stack Expert</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2 rounded-full border border-green-500/20">
                      <Brain className="w-4 h-4 text-green-400" />
                      <span className="text-green-300">Algorithm Specialist</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                      <Heart className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300">Open Source Contributor</span>
                    </div>
                  </div>

                  <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Passionate about creating educational technology that makes complex concepts accessible. 
                    With years of experience in software development and a deep understanding of data structures 
                    and algorithms, I built this platform to help aspiring developers excel in their coding journey.
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-6 pt-4">
                    <a 
                      href="https://github.com/adarsh-priydarshi-5646" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
                      <span className="text-gray-300 group-hover:text-white">GitHub</span>
                    </a>
                    <a 
                      href="mailto:adarshpriydarshi5646@gmail.com"
                      className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Mail className="w-5 h-5 text-white" />
                      <span className="text-white">Contact</span>
                    </a>
                  </div>

                  {/* Fun Facts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                    <div className="text-center">
                      <Coffee className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">500+</div>
                      <div className="text-gray-400 text-sm">Cups of Coffee</div>
                    </div>
                    <div className="text-center">
                      <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">1000+</div>
                      <div className="text-gray-400 text-sm">Hours Coding</div>
                    </div>
                    <div className="text-center">
                      <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">100%</div>
                      <div className="text-gray-400 text-sm">Dedication</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl p-12 border border-white/20"
            >
              <Rocket className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Coding Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join <span className="text-purple-400 font-semibold">10,000+ developers</span> who have mastered DSA with our platform.
                Your path to <span className="text-blue-400 font-semibold">FAANG success</span> starts here.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2 rounded-full border border-green-500/20">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Free Forever</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300">Instant Access</span>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <Zap className="w-6 h-6 group-hover:animate-pulse" />
                    Start Learning Now
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 backdrop-blur-lg bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <Users className="w-5 h-5" />
                    Already a Member?
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
