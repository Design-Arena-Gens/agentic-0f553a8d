'use client';

import { useForm } from 'react-hook-form';
import { CATEGORY_LABELS, Category, Expense } from '@/utils/types';
import { generateId } from '@/utils/storage';
import dayjs from 'dayjs';

type FormValues = {
  description: string;
  amount: number;
  category: Category;
  date: string;
};

export function ExpenseForm({ onAdd }: { onAdd: (e: Expense) => void }) {
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    defaultValues: {
      description: '',
      amount: 0,
      category: 'groceries',
      date: dayjs().format('YYYY-MM-DD')
    }
  });

  const onSubmit = (data: FormValues) => {
    const expense: Expense = {
      id: generateId(),
      description: data.description.trim(),
      amount: Number(data.amount),
      category: data.category,
      date: data.date
    };
    onAdd(expense);
    reset({
      description: '',
      amount: 0,
      category: data.category,
      date: dayjs().format('YYYY-MM-DD')
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-12">
      <div className="md:col-span-5">
        <label className="label">Description</label>
        <input
          className="input"
          placeholder="e.g., Coffee, Electricity bill"
          {...register('description', { required: true, minLength: 2 })}
        />
        {formState.errors.description && (
          <p className="mt-1 text-xs text-red-600">Please enter a description</p>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="label">Amount</label>
        <input
          type="number"
          step="0.01"
          min="0"
          className="input"
          {...register('amount', { required: true, min: 0.01 })}
        />
        {formState.errors.amount && (
          <p className="mt-1 text-xs text-red-600">Enter a valid amount</p>
        )}
      </div>
      <div className="md:col-span-3">
        <label className="label">Category</label>
        <select className="input" {...register('category', { required: true })}>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="label">Date</label>
        <input type="date" className="input" {...register('date', { required: true })} />
      </div>
      <div className="md:col-span-12 flex justify-end">
        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </div>
    </form>
  );
}

