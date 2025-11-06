import { getTransactions } from '@/lib/cosmic';
import TransactionTable from '@/components/TransactionTable';
import TransactionStats from '@/components/TransactionStats';

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Transactions</h1>
        <p className="text-gray-400 mt-1">Complete transaction history and analysis</p>
      </div>

      <TransactionStats transactions={transactions} />
      <TransactionTable transactions={transactions} />
    </div>
  );
}