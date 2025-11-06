'use client';

import { Transaction } from '@/types';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';

interface FraudTrendsChartProps {
  transactions: Transaction[];
}

export default function FraudTrendsChart({ transactions }: FraudTrendsChartProps) {
  // Prepare data for the last 7 days
  const prepareChartData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = startOfDay(subDays(new Date(), i));
      const dateStr = format(date, 'MMM d');
      
      const dayTransactions = transactions.filter(t => {
        const tDate = startOfDay(new Date(t.metadata?.timestamp || ''));
        return tDate.getTime() === date.getTime();
      });
      
      const fraudulent = dayTransactions.filter(t => t.metadata?.is_fraudulent).length;
      const legitimate = dayTransactions.length - fraudulent;
      
      data.push({
        date: dateStr,
        fraudulent,
        legitimate,
        total: dayTransactions.length,
        fraudRate: dayTransactions.length > 0 ? (fraudulent / dayTransactions.length) * 100 : 0
      });
    }
    return data;
  };

  const data = prepareChartData();

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-semibold text-white mb-6">Fraud Trends</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="fraudulent"
            stroke="#EF4444"
            strokeWidth={2}
            name="Fraudulent"
            dot={{ fill: '#EF4444', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="legitimate"
            stroke="#10B981"
            strokeWidth={2}
            name="Legitimate"
            dot={{ fill: '#10B981', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="fraudRate"
            stroke="#F59E0B"
            strokeWidth={2}
            name="Fraud Rate %"
            dot={{ fill: '#F59E0B', r: 4 }}
            activeDot={{ r: 6 }}
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}