import { use } from 'react';
import { fetchMonthlySummary } from '../../lib/api';

interface MonthlySummaryReportProps {
  userId: string;
  year: number;
  month: number;
}

export function MonthlySummaryReport({ userId, year, month }: MonthlySummaryReportProps) {
  // Use React 19's `use` hook to fetch data declaratively
  const summary = use(fetchMonthlySummary(userId, year, month));

  if (summary.totalExpenses === 0) {
    return (
      <div className="mt-4 rounded-md border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">No expenses recorded for this period.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="p-6">
        <p className="text-sm font-medium text-gray-500">Total Expenses</p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900">
          ${summary.totalExpenses.toFixed(2)}
        </p>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Breakdown by Category
        </h3>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {summary.byCategory.map(({ category, amount }) => (
          <li key={category} className="flex justify-between gap-x-6 px-6 py-4">
            <div className="text-sm font-medium text-gray-900">{category}</div>
            <div className="text-sm text-gray-700">${amount.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}