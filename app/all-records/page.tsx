'use client';

import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AllRecords = () => {
  const router = useRouter();
  const [records, setRecords] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  useEffect(() => {
    const resultsRef = ref(db, 'water_quality_results');
    onValue(resultsRef, (snapshot) => {
      const fetchedRecords: any[] = [];
      snapshot.forEach((childSnapshot) => {
        fetchedRecords.push(childSnapshot.val());
      });
      setRecords(fetchedRecords);
    });
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleRedirect = (data: any) => {
    const queryString = encodeURIComponent(JSON.stringify(data));
    router.push(`/details?data=${queryString}`);
  };

  console.log(records)

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-3xl font-bold text-blue-900 mb-4 md:mb-0"
          >
            Water Quality Records
          </motion.h1>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="text-blue-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-100">
              <thead className="bg-blue-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    pH
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Temperature
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    TDS
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Turbidity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {currentRecords.map((record, index) => (
                  <motion.tr
                    key={index}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className="cursor-pointer"
                    onClick={() => handleRedirect(record)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                      {indexOfFirstRecord + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800">
                      {record.pH}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800">
                      {record?.Temperature}°C
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800">
                      {record.TDS} ppm
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800">
                      {record.Turbidity} NTU
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          record?.final_result === 'Drinkable'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {record.final_result}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-6 py-2 rounded-full font-medium shadow-md transition-colors ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </motion.button>
          
          <span className="text-blue-900 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-6 py-2 rounded-full font-medium shadow-md transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AllRecords;