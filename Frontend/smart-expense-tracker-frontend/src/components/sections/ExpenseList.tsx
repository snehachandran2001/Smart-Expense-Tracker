import { use } from 'react';
import { fetchExpenses } from '../../lib/api';
import { type Expense } from '../../lib/types';

interface ExpenseListProps {
  userId: string;
}

export function ExpenseList({ userId }: ExpenseListProps) {
  const expenses = use(fetchExpenses(userId));

  if (expenses.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">No expenses found for this user.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {expenses.map((expense: Expense) => (
            <tr key={expense.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{expense.date}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{expense.description}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{expense.category}</td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-800">
                ${expense.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
