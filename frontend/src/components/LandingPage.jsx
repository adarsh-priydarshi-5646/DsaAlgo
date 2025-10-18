import React, { useRef } from 'react';
import { ArrowRight, Brain, Code, Clock, Trophy, Sparkles, Zap, Target, BookOpen, Users } from 'lucide-react';
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
      title: 'Interactive Coding',
      description: 'Practice with our advanced code editor supporting multiple languages',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI-powered hints and explanations to guide your learning journey',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Comprehensive analytics and achievement system to monitor growth',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join thousands of developers in our supportive learning community',
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
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <FloatingElements />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
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

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Master Data Structures & Algorithms with our interactive 3D learning platform.
                <br />
                <span className="text-purple-400">Code, Learn, Conquer.</span>
              </motion.p>

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
                Experience the future of coding education with our immersive 3D learning environment
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

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl p-12 border border-white/20"
            >
              <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who have mastered DSA with our platform.
                Your coding career transformation starts here.
              </p>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <Zap className="w-6 h-6" />
                  Get Started Free
                  <ArrowRight className="w-6 h-6" />
                </Link>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
