'use client';

import { useEffect, useMemo, useState } from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { Filters } from '@/components/Filters';
import { Summary } from '@/components/Summary';
import { CategoryChart } from '@/components/CategoryChart';
import { Expense, ExpenseFilters } from '@/utils/types';
import { loadExpenses, saveExpenses } from '@/utils/storage';
import dayjs from 'dayjs';

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({
    query: '',
    category: 'all',
    from: '',
    to: ''
  });

  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const filtered = useMemo(() => {
    return expenses
      .filter((e) =>
        filters.category === 'all' ? true : e.category === filters.category
      )
      .filter((e) =>
        filters.query
          ? e.description.toLowerCase().includes(filters.query.toLowerCase())
          : true
      )
      .filter((e) =>
        filters.from ? dayjs(e.date).isAfter(dayjs(filters.from).subtract(1, 'day')) : true
      )
      .filter((e) =>
        filters.to ? dayjs(e.date).isBefore(dayjs(filters.to).add(1, 'day')) : true
      )
      .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
  }, [expenses, filters]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const updateExpense = (updated: Expense) => {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <header className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Personal Expenses
          </h1>
          <p className="text-slate-600">Track where your money goes.</p>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <ExpenseForm onAdd={addExpense} />
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Filters filters={filters} onChange={setFilters} />
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-0 shadow-sm">
            <ExpenseList
              expenses={filtered}
              onDelete={deleteExpense}
              onUpdate={updateExpense}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Summary expenses={filtered} />
          <CategoryChart expenses={filtered} />
        </div>
      </section>
    </main>
  );
}

