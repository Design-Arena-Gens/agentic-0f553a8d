'use client';

import { useState } from 'react';
import { CATEGORY_LABELS, Expense } from '@/utils/types';
import { formatCurrency } from '@/utils/format';
import dayjs from 'dayjs';

export function ExpenseList({
  expenses,
  onDelete,
  onUpdate
}: {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onUpdate: (expense: Expense) => void;
}) {
  if (expenses.length === 0) {
    return (
      <div className="p-6 text-center text-slate-600">
        No expenses yet. Add your first one above!
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200">
      {expenses.map((e) => (
        <ExpenseRow key={e.id} expense={e} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}

function ExpenseRow({
  expense,
  onDelete,
  onUpdate
}: {
  expense: Expense;
  onDelete: (id: string) => void;
  onUpdate: (expense: Expense) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(expense);

  const save = () => {
    onUpdate(draft);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:gap-4">
      <div className="flex-1">
        {isEditing ? (
          <input
            className="input"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          />
        ) : (
          <p className="font-medium">{expense.description}</p>
        )}
        <p className="text-sm text-slate-500">
          {CATEGORY_LABELS[expense.category]} ? {dayjs(expense.date).format('MMM D, YYYY')}
        </p>
      </div>
      <div className="w-full md:w-48">
        {isEditing ? (
          <input
            type="date"
            className="input"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
        ) : null}
      </div>
      <div className="w-full md:w-40">
        {isEditing ? (
          <input
            type="number"
            className="input"
            value={draft.amount}
            step="0.01"
            min="0"
            onChange={(e) =>
              setDraft({ ...draft, amount: Number((e.target as HTMLInputElement).value) })
            }
          />
        ) : (
          <p className="text-right font-semibold">{formatCurrency(expense.amount)}</p>
        )}
      </div>
      <div className="flex w-full justify-end gap-2 md:w-auto">
        {isEditing ? (
          <>
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setDraft(expense);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn btn-ghost" onClick={() => onDelete(expense.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

