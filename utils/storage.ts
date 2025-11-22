import { Expense } from './types';

const STORAGE_KEY = 'expenses.v1';

export function loadExpenses(): Expense[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Expense[];
    // Basic validation
    return Array.isArray(parsed) ? parsed.filter(validExpense) : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: Expense[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch {
    // ignore
  }
}

function validExpense(e: any): e is Expense {
  return (
    typeof e === 'object' &&
    e &&
    typeof e.id === 'string' &&
    typeof e.description === 'string' &&
    typeof e.category === 'string' &&
    typeof e.amount === 'number' &&
    typeof e.date === 'string'
  );
}

export function generateId(): string {
  // Simple, stable id
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

