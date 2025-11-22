'use client';

import { Expense, CATEGORY_LABELS, Category } from '@/utils/types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const COLORS: Record<Category, string> = {
  groceries: '#0ea5e9',
  rent: '#f43f5e',
  utilities: '#a855f7',
  transport: '#22c55e',
  entertainment: '#f59e0b',
  dining: '#14b8a6',
  shopping: '#ef4444',
  health: '#06b6d4',
  income: '#84cc16',
  other: '#64748b'
};

export function CategoryChart({ expenses }: { expenses: Expense[] }) {
  const totals = Object.keys(CATEGORY_LABELS).reduce<Record<string, number>>((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  for (const e of expenses) {
    totals[e.category] += e.category === 'income' ? -e.amount : e.amount;
  }

  const labels = Object.entries(CATEGORY_LABELS).map(([key, label]) => label);
  const data = {
    labels,
    datasets: [
      {
        label: 'Spending by Category',
        data: Object.keys(CATEGORY_LABELS).map((k) => Math.max(0, totals[k])),
        backgroundColor: Object.keys(CATEGORY_LABELS).map((k) => COLORS[k as Category])
      }
    ]
  };

  return (
    <div className="card p-4">
      <h2 className="mb-3 text-lg font-semibold">Category Breakdown</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }}
      />
    </div>
  );
}

