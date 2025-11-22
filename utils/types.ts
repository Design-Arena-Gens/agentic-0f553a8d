export type Category =
  | 'groceries'
  | 'rent'
  | 'utilities'
  | 'transport'
  | 'entertainment'
  | 'dining'
  | 'shopping'
  | 'health'
  | 'income'
  | 'other';

export const CATEGORY_LABELS: Record<Category, string> = {
  groceries: 'Groceries',
  rent: 'Rent',
  utilities: 'Utilities',
  transport: 'Transport',
  entertainment: 'Entertainment',
  dining: 'Dining',
  shopping: 'Shopping',
  health: 'Health',
  income: 'Income',
  other: 'Other'
};

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: string; // ISO yyyy-mm-dd
}

export interface ExpenseFilters {
  query: string;
  category: Category | 'all';
  from: string; // yyyy-mm-dd or ''
  to: string; // yyyy-mm-dd or ''
}

