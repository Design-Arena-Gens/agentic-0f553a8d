'use client';

import { CATEGORY_LABELS, Category, ExpenseFilters } from '@/utils/types';

export function Filters({
  filters,
  onChange
}: {
  filters: ExpenseFilters;
  onChange: (f: ExpenseFilters) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
      <div className="md:col-span-4">
        <label className="label">Search</label>
        <input
          className="input"
          placeholder="Find by description"
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
        />
      </div>
      <div className="md:col-span-3">
        <label className="label">Category</label>
        <select
          className="input"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as Category | 'all' })}
        >
          <option value="all">All</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="label">From</label>
        <input
          type="date"
          className="input"
          value={filters.from}
          onChange={(e) => onChange({ ...filters, from: e.target.value })}
        />
      </div>
      <div className="md:col-span-2">
        <label className="label">To</label>
        <input
          type="date"
          className="input"
          value={filters.to}
          onChange={(e) => onChange({ ...filters, to: e.target.value })}
        />
      </div>
      <div className="md:col-span-1 flex items-end">
        <button
          className="btn btn-ghost"
          onClick={() => onChange({ query: '', category: 'all', from: '', to: '' })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

