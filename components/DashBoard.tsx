'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';

const sensors = [
  { 
    name: 'pH Sensor', 
    img: 'https://cdn-icons-png.flaticon.com/512/4393/4393560.png', 
    description: 'Measures acidity/alkalinity of water (0-14 scale)',
    min: 0,
    max: 14,
    unit: 'pH',
    value: 7.2
  },
  { 
    name: 'TDS Sensor', 
    img: 'https://cdn-icons-png.flaticon.com/512/4393/4393580.png', 
    description: 'Measures total dissolved solids in water',
    min: 0,
    max: 1000,
    unit: 'ppm',
    value: 320
  },
  { 
    name: 'Turbidity Sensor', 
    img: 'https://cdn-icons-png.flaticon.com/512/4393/4393570.png', 
    description: 'Measures water clarity by detecting suspended particles',
    min: 0,
    max: 10,
    unit: 'NTU',
    value: 1.8
  },
  { 
    name: 'Temperature Sensor', 
    img: 'https://cdn-icons-png.flaticon.com/512/4393/4393550.png', 
    description: 'Measures water temperature in real-time',
    min: 0,
    max: 50,
    unit: '°C',
    value: 24.5
  },
  { 
    name: 'ESP32 Microcontroller', 
    img: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png', 
    description: 'Central processing unit for sensor data collection',
    value: null
  },
];

const mlAlgorithms = [
  { 
    name: 'Random Forest', 
    description: 'Ensemble learning method for classification and regression',
    accuracy: '92%'
  },
  { 
    name: 'Support Vector Machine', 
    description: 'Powerful for high-dimensional spaces with clear margin of separation',
    accuracy: '88%'
  },
  { 
    name: 'K-Nearest Neighbors', 
    description: 'Simple algorithm that stores all available cases',
    accuracy: '85%'
  },
  { 
    name: 'Logistic Regression', 
    description: 'Statistical model for binary classification problems',
    accuracy: '83%'
  },
  { 
    name: 'Naive Bayes', 
    description: 'Probabilistic classifier based on Bayes theorem',
    accuracy: '80%'
  }
];

const testimonials = [
  {
    quote: "This system revolutionized our water quality monitoring process. The accuracy is unmatched!",
    author: "Dr. Sarah Johnson",
    role: "Environmental Scientist"
  },
  {
    quote: "The real-time data and predictive analytics have saved us countless hours in the lab.",
    author: "Mark Williams",
    role: "Water Treatment Plant Manager"
  },
  {
    quote: "As a researcher, I appreciate the comprehensive dataset and machine learning integration.",
    author: "Prof. David Chen",
    role: "Hydrology Researcher"
  }
];

const features = [
  {
    title: "Real-time Monitoring",
    description: "Get instant readings from multiple sensors simultaneously",
    icon: "⏱️"
  },
  {
    title: "Predictive Analytics",
    description: "ML-powered predictions of water quality trends",
    icon: "🔮"
  },
  {
    title: "Cloud Integration",
    description: "Access your data anywhere with our secure cloud platform",
    icon: "☁️"
  },
  {
    title: "Record Keeping",
    description: "Automatically log and store all your water quality data for historical analysis",
    icon: "📊"
  }
];

const WaterQualityLanding = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sensorValues, setSensorValues] = useState(sensors.map(s => s.value));

  // Simulate slight variations in sensor values
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorValues(prev => prev.map((val, i) => {
        if (sensors[i].value === null) return null;
        const variation = (Math.random() - 0.5) * 0.5;
        //@ts-ignore
        return Math.max(sensors[i].min, Math.min(sensors[i].max, val + variation));
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Synergestic Approach to Water Quality <span className="text-blue-600">Monitoring</span>
            </h1>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto mb-10">
              Real-time sensor data and ML-powered analytics for comprehensive water quality assessment
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/SignInPage">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg"
              >
                Get Started
              </motion.button>
              </Link>
              {/* <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg"
              >
                Learn More
              </motion.button> */}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20"
        ></motion.div>
        <motion.div 
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-300 rounded-full opacity-20"
        ></motion.div>
      </section>

      {/* Sensor Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Our <span className="text-blue-600">Sensor</span> Ecosystem
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {sensors.map((sensor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-blue-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-4">
                  <img 
                    src={sensor.img} 
                    alt={sensor.name} 
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-blue-800 mb-2">{sensor.name}</h3>
                <p className="text-blue-600 text-center text-sm mb-4">{sensor.description}</p>
                
                {sensor.value !== null && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-blue-500 mb-1">
                      <span>{sensor.min}{sensor.unit}</span>
                      <span>{sensor.max}{sensor.unit}</span>
                    </div>
                    <div className="relative h-4 bg-blue-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ 
                          //@ts-ignore
                          width: `${((sensorValues[idx] - sensor.min) / (sensor.max - sensor.min)) * 100}%`
                        }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-2xl font-bold text-blue-900">
                        {sensorValues[idx]?.toFixed(1)}
                      </span>
                      <span className="text-blue-600 ML-1">{sensor.unit}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Powerful <span className="text-blue-600">Features</span>
            </h2>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto">
              Everything you need for comprehensive water quality analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h3>
                <p className="text-blue-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ML & Analytics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                ML-Powered <span className="text-blue-600">Analytics</span>
              </h2>
              <p className="text-lg text-blue-800 mb-8">
                Our system employs advanced machine learning algorithms to predict water quality trends, 
                detect anomalies, and provide actionable insights.
              </p>
              
              <div className="space-y-4">
                {mlAlgorithms.map((algo, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-blue-800">{algo.name}</h3>
                    </div>
                    <p className="text-blue-600 text-sm mt-1">{algo.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="bg-blue-100 rounded-xl p-6 shadow-lg">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Water Analysis Dashboard" 
                    className="rounded-lg w-full h-auto"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-blue-600 text-white rounded-full p-4 shadow-xl"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-xs text-blue-500">Monitoring</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">99.9%</div>
                    <div className="text-xs text-blue-500">Uptime</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">50+</div>
                    <div className="text-xs text-blue-500">Parameters</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            What Our <span className="text-blue-600">Clients</span> Say
          </motion.h2>
          
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper max-w-4xl"
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx}>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="bg-white p-8 rounded-xl shadow-md"
                >
                  <div className="text-5xl text-blue-200 mb-4">"</div>
                  <p className="text-lg text-blue-800 mb-6">{testimonial.quote}</p>
                  <div className="text-blue-600 font-semibold">{testimonial.author}</div>
                  <div className="text-blue-400 text-sm">{testimonial.role}</div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Water Monitoring?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto"
          >
            Join hundreds of organizations using our platform for reliable water quality insights.
          </motion.p>
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold shadow-lg text-lg"
            >
              Request a Demo
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg"
            >
              Contact Sales
            </motion.button>
          </motion.div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">AquaCheck</h3>
              <p className="text-blue-300">Intelligent water quality monitoring for a safer tomorrow.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300">
            <p>© 2025 AquaCheck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WaterQualityLanding;