import { use } from 'react';
import { fetchExpensesForUser } from '../../lib/api';
import { type Expense } from '../../lib/types';

// This component is wrapped in <Suspense> in HomePage.tsx
export function ExpenseList({ userId }: { userId: string }) {
  // The `use` hook will "unwrap" the promise.
  // While the data is fetching, it suspends, and the fallback from
  // the <Suspense> boundary in HomePage.tsx will be shown.
  const expenses = use(fetchExpensesForUser(userId)) as Expense[];

  if (expenses.length === 0) {
    return <p className="text-gray-500">No expenses found for this user.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {expenses.map((expense) => (
        <li key={expense.id} className="py-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">{expense.description}</p>
            <p className="text-sm text-gray-500">{expense.category}</p>
          </div>
          <p className="font-mono text-gray-900">
            ${expense.amount.toFixed(2)}
          </p>
        </li>
      ))}
    </ul>
  );
}
