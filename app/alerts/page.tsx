import { getFraudAlerts } from '@/lib/cosmic';
import AlertsTable from '@/components/AlertsTable';
import AlertStats from '@/components/AlertStats';

export default async function AlertsPage() {
  const alerts = await getFraudAlerts();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Fraud Alerts</h1>
        <p className="text-gray-400 mt-1">Monitor and manage fraud detection alerts</p>
      </div>

      <AlertStats alerts={alerts} />
      <AlertsTable alerts={alerts} />
    </div>
  );
}