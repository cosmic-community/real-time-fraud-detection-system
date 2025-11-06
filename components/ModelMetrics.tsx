'use client';

import { formatPercentage } from '@/lib/utils';
import { Activity, Target, TrendingUp, Zap } from 'lucide-react';

interface ModelMetricsProps {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export default function ModelMetrics({ accuracy, precision, recall, f1Score }: ModelMetricsProps) {
  const metrics = [
    { label: 'Accuracy', value: accuracy, icon: Target, color: 'text-blue-500' },
    { label: 'Precision', value: precision, icon: Activity, color: 'text-green-500' },
    { label: 'Recall', value: recall, icon: TrendingUp, color: 'text-yellow-500' },
    { label: 'F1 Score', value: f1Score, icon: Zap, color: 'text-purple-500' },
  ];

  return (
    <div className="bg-dark-200 rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-semibold text-white mb-6">Model Performance</h3>
      
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-sm text-gray-400">{metric.label}</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {formatPercentage(metric.value)}
              </span>
            </div>
            <div className="w-full bg-dark-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${
                  metric.color === 'text-blue-500' ? 'from-blue-500/50 to-blue-500' :
                  metric.color === 'text-green-500' ? 'from-green-500/50 to-green-500' :
                  metric.color === 'text-yellow-500' ? 'from-yellow-500/50 to-yellow-500' :
                  'from-purple-500/50 to-purple-500'
                } transition-all duration-1000 ease-out`}
                style={{ width: `${metric.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">
          Model v2.1.0 • Last updated 2 hours ago
        </p>
      </div>
    </div>
  );
}