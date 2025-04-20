'use client';

import SensorChart from '@/components/shared/Sensors/SensorChart';
import { db } from '@/firebase';
import { ref, onValue } from 'firebase/database';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RealTimeDataTable = () => {
  const router = useRouter();
  const [latestData, setLatestData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(db, 'water_quality_results');
    onValue(dataRef, (snapshot) => {
      let mostRecentRecord: any = null;
      let records: any[] = [];

      snapshot.forEach((childSnapshot) => {
        const record = childSnapshot.val();
        records.push(record);

        // Parse created_at as a Date object for accurate comparison
        const recordDate = new Date(record.created_at);

        // Check if the current record is the most recent one
        if (
          !mostRecentRecord ||
          recordDate > new Date(mostRecentRecord?.created_at)
        ) {
          mostRecentRecord = record;
        }
      });

      setLatestData(mostRecentRecord);
      setIsLoading(false);
    });
  }, []);

  const sensorReadings = [
    {
      label: 'TDS',
      value: `${latestData?.TDS || '--'} ppm`,
      icon: '📊',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'pH',
      value: latestData?.pH || '--',
      icon: '🧪',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      label: 'Temperature',
      value: `${latestData?.Temperature || '--'} °C`,
      icon: '🌡️',
      color: 'bg-red-100 text-red-800'
    },
    {
      label: 'Turbidity',
      value: `${latestData?.Turbidity || '--'} NTU`,
      icon: '💧',
      color: 'bg-cyan-100 text-cyan-800'
    },
    {
      label: 'Recorded At',
      value: latestData?.created_at || '--',
      icon: '⏱️',
      color: 'bg-gray-100 text-gray-800'
    }
  ];

  const handleRedirect = () => {
    const queryString = encodeURIComponent(JSON.stringify(latestData));
    router.push(`/details?data=${queryString}`);
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
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
            Real-Time Water Quality Monitoring
          </motion.h1>
          <p className="text-blue-600">Live sensor data and analytics</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-blue-800">Loading live data...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div onClick={handleRedirect}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              >
                <div className="bg-blue-600 p-4">
                  <h2 className="text-xl font-semibold text-white text-center">
                    Current Sensor Readings
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {sensorReadings.map((reading, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{reading.icon}</span>
                        <span className="font-medium text-blue-800">
                          {reading.label}
                        </span>
                      </div>
                      <div
                        className={`${reading.color} rounded-full px-4 py-1 font-medium`}
                      >
                        {reading.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-blue-50 p-3 text-center text-blue-600 text-sm font-medium">
                  Click to view detailed analysis
                </div>
              </motion.div>
            </div>

            {/* Sensor Readings Card */}

            {/* Sensor Chart - Full Width */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-blue-800 mb-4">
                  Real-Time Data Visualization
                </h2>
                <SensorChart data={latestData} />
              </motion.div>
            </div>

            {/* Status Indicator */}
            <div className="lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`p-4 rounded-xl shadow-lg ${
                  latestData?.models?.KNN?.result === 'drinkable'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Current Water Status
                    </h3>
                    <p className="text-sm">
                      Based on machine learning analysis
                    </p>
                  </div>
                  <div className="text-2xl font-bold">
                    {latestData?.models?.KNN?.result === 'drinkable'
                      ? 'Drinkable'
                      : 'Not Drinkable'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RealTimeDataTable;
