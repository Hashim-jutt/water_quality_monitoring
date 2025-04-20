'use client';

import ConfusionMatrixChart from '@/components/shared/Sensors/ConfusionMatrixChart';
import SensorChart from '@/components/shared/Sensors/SensorChart';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DetailsPage = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>();

  useEffect(() => {
    const raw = searchParams.get('data');
    if (raw) {
      const parsedData = JSON.parse(decodeURIComponent(raw));
      console.log(parsedData)
      
      if (parsedData.models && typeof parsedData.models === 'object') {
        parsedData.models = Object.entries(parsedData.models).map(([name, model]) => ({
          name,
          //@ts-ignore
          ...model
        }));
      }
      setData(parsedData);
    }
  }, [searchParams]);

  console.log(data , "DATA")

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      {data ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h1 
              whileHover={{ scale: 1.02 }}
              className="text-3xl font-bold text-blue-900 mb-2"
            >
              Water Quality Analysis
            </motion.h1>
            <p className="text-blue-600">
              Detailed sensor readings and machine learning analysis
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sensor Readings Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-blue-600 p-4">
                <h2 className="text-xl font-semibold text-white text-center">
                  Sensor Readings
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'TDS', value: `${data.TDS} ppm`, icon: '📊' },
                  { label: 'pH', value: data.pH, icon: '🧪' },
                  { label: 'Temperature', value: `${data.Temperature} °C`, icon: '🌡️' },
                  { label: 'Turbidity', value: `${data.Turbidity} NTU`, icon: '💧' },
                  { label: 'Recorded At', value: data.recordedAt, icon: '⏱️' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium text-blue-800">{item.label}</span>
                    </div>
                    <div className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-medium">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sensor Chart - Full Width */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">
                  Sensor Data Visualization
                </h2>
                <SensorChart data={data} />
              </div>
            </div>

            {/* Model Analysis Cards */}
            {Array.isArray(data?.models) && data.models.length > 0 ? (
              data.models.map((model: any, index: any) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden lg:col-span-2"
                >
                  <div className="bg-blue-600 p-4">
                    <h2 className="text-xl font-semibold text-white">
                      {model.name} Analysis
                    </h2>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-medium text-blue-800 mb-2">Result</h3>
                        <span className={`text-lg font-semibold ${
                          model.result === 'drinkable' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {model.result}
                        </span>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-medium text-blue-800 mb-2">Accuracy</h3>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-blue-800">
                            {model.accuracy}%
                          </span>
                          <div className="ml-2 w-full bg-blue-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${model.accuracy}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800 mb-2">Metrics</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-blue-600">F1 Score</p>
                          <p className="font-semibold">{model.f1_score}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600">Precision</p>
                          <p className="font-semibold">{model.accuracy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-600">Recall</p>
                          <p className="font-semibold">{model.recall}</p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <h3 className="font-medium text-blue-800 mb-4">Confusion Matrix</h3>
                      <div className="bg-white p-4 rounded-lg border border-blue-100">
                        <ConfusionMatrixChart matrix={model.confusion_matrix} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-lg col-span-2 py-8">
                No model analysis data available
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-blue-800">Loading analysis data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;