import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//@ts-ignore
const ConfusionMatrixChart = ({ matrix }) => {
  console.log(matrix)
  
  const data = [
    { name: 'True Positive', value: matrix[0][0] },
    { name: 'False Positive', value: matrix[0][1] },
    { name: 'False Negative', value: matrix[1][0] },
    { name: 'True Negative', value: matrix[1][1] }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ConfusionMatrixChart;
