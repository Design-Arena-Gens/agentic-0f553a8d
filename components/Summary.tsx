import { Expense } from '@/utils/types';
import { formatCurrency } from '@/utils/format';

export function Summary({ expenses }: { expenses: Expense[] }) {
  const totalOut = expenses
    .filter((e) => e.amount >= 0 && e.category !== 'income')
    .reduce((acc, e) => acc + e.amount, 0);

  const totalIn = expenses
    .filter((e) => e.category === 'income')
    .reduce((acc, e) => acc + e.amount, 0);

  const net = totalIn - totalOut;

  return (
    <div className="card p-4">
      <h2 className="mb-3 text-lg font-semibold">Summary</h2>
      <div className="grid grid-cols-3 gap-3">
        <Card label="Income" value={formatCurrency(totalIn)} />
        <Card label="Expenses" value={formatCurrency(totalOut)} />
        <Card
          label="Net"
          value={formatCurrency(net)}
          accent={net >= 0 ? 'text-emerald-600' : 'text-red-600'}
        />
      </div>
    </div>
  );
}

function Card({
  label,
  value,
  accent
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-bold ${accent ?? ''}`}>{value}</p>
    </div>
  );
}

