'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  
  interface sensorProps {
    data: any
  }
  
  const SensorChart:React.FC<sensorProps> = ({data}) => {

    const formattedData = [
    { name: 'TDS', value: data?.TDS },
    { name: 'Temperature', value: data?.Temperature },
    { name: 'Turbidity', value: data?.Turbidity },
    { name: 'pH', value: data?.pH }
    ];
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };
  
  export default SensorChart;
  