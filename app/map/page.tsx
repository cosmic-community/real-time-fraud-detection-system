import { getTransactions } from '@/lib/cosmic';
import dynamic from 'next/dynamic';

const FraudMap = dynamic(() => import('@/components/FraudMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-dark-200 rounded-xl flex items-center justify-center">
      <div className="text-gray-400">Loading map...</div>
    </div>
  )
});

export default async function MapPage() {
  const transactions = await getTransactions();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Fraud Map</h1>
        <p className="text-gray-400 mt-1">Geographical visualization of transaction patterns</p>
      </div>

      <FraudMap transactions={transactions} />
    </div>
  );
}