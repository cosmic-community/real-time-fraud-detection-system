import { getDashboardStats, getTransactions, getFraudAlerts } from '@/lib/cosmic';
import StatsCard from '@/components/StatsCard';
import TransactionFeed from '@/components/TransactionFeed';
import FraudGauge from '@/components/FraudGauge';
import AlertPanel from '@/components/AlertPanel';
import ModelMetrics from '@/components/ModelMetrics';
import FraudTrendsChart from '@/components/FraudTrendsChart';
import { 
  CreditCard, 
  AlertTriangle, 
  TrendingUp, 
  Shield 
} from 'lucide-react';

export default async function DashboardPage() {
  const [stats, transactions, alerts] = await Promise.all([
    getDashboardStats(),
    getTransactions(),
    getFraudAlerts()
  ]);

  const recentTransactions = transactions.slice(0, 10);
  const recentAlerts = alerts.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Fraud Detection Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time monitoring and analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm text-gray-400">System Active</span>
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Transactions"
          value={stats.totalTransactions}
          icon={<CreditCard className="w-5 h-5" />}
          trend={12.5}
          color="primary"
        />
        <StatsCard
          title="Fraud Detected"
          value={stats.fraudulentTransactions}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={-8.2}
          color="danger"
        />
        <StatsCard
          title="Active Alerts"
          value={stats.activeAlerts}
          icon={<Shield className="w-5 h-5" />}
          trend={5.3}
          color="warning"
        />
        <StatsCard
          title="Fraud Rate"
          value={`${stats.fraudRate.toFixed(1)}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={stats.fraudRate > 2 ? 15.8 : -3.2}
          color={stats.fraudRate > 2 ? 'danger' : 'success'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Transaction Feed */}
        <div className="lg:col-span-2 space-y-6">
          <TransactionFeed transactions={recentTransactions} />
          <FraudTrendsChart transactions={transactions} />
        </div>

        {/* Right Column - Gauges and Alerts */}
        <div className="space-y-6">
          <FraudGauge 
            score={recentTransactions[0]?.metadata?.fraud_score || 0} 
            transaction={recentTransactions[0]}
          />
          <AlertPanel alerts={recentAlerts} />
          <ModelMetrics 
            accuracy={stats.modelAccuracy}
            precision={stats.modelPrecision}
            recall={stats.modelRecall}
            f1Score={stats.modelF1Score}
          />
        </div>
      </div>
    </div>
  );
}