import { Suspense, useState, use, startTransition, useCallback } from "react";
import { fetchUsers } from "../lib/api";
import { type User, type Expense } from "../lib/types";
import { ExpenseList } from "../components/sections/ExpenseList";
import { ExpenseEntryForm } from "../components/forms/ExpenseEntryForm";
import { ReportFilters } from "../components/forms/ReportFilters";
import { MonthlySummaryReport } from "../components/sections/MonthlySummaryReport";

const usersPromise = fetchUsers();

function UserSelector({
  users,
  selectedUserId,
  onUserChange,
}: {
  users: User[];
  selectedUserId: string;
  onUserChange: (userId: string) => void;
}) {
  return (
    <div className="mb-6">
      <label
        htmlFor="user-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select User
      </label>
      <select
        id="user-select"
        className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedUserId}
        onChange={(e) => onUserChange(e.target.value)}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col justify-center items-center p-8 text-gray-500">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-2">{text}</p>
    </div>
  );
}

export function HomePage() {
  const users = use(usersPromise) as User[];
  const [selectedUserId, setSelectedUserId] = useState<string>(
    users[0]?.id || ""
  );
  const [expenseListKey, setExpenseListKey] = useState(Date.now());
  const [reportFilters, setReportFilters] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const handleExpenseAdded = useCallback(
    (newExpense: Expense) => {
      if (newExpense.userId === selectedUserId) {
        startTransition(() => {
          setExpenseListKey(Date.now());
        });
      }
    },
    [selectedUserId]
  );

  const handleFilterChange = useCallback(
    (filters: { year: number; month: number }) => {
      startTransition(() => {
        setReportFilters(filters);
      });
    },
    []
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* User Selector */}
      <section className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Choose a User
        </h2>
        <UserSelector
          users={users}
          selectedUserId={selectedUserId}
          onUserChange={setSelectedUserId}
        />
      </section>

      {/* Expense Entry */}
      <section className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add New Expense
        </h2>
        {selectedUserId ? (
          <ExpenseEntryForm
            userId={selectedUserId}
            onExpenseAdded={handleExpenseAdded}
          />
        ) : (
          <p className="text-gray-500">Please select a user to add an expense.</p>
        )}
      </section>

      {/* Expense List */}
      <section className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Your Expenses
        </h2>
        {selectedUserId ? (
          <Suspense fallback={<LoadingSpinner text="Loading expenses..." />}>
            <ExpenseList
              key={`${selectedUserId}-${expenseListKey}`}
              userId={selectedUserId}
            />
          </Suspense>
        ) : (
          <p className="text-gray-500">
            Please select a user to see their expenses.
          </p>
        )}
      </section>

      {/* Report */}
      <section className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Report
        </h2>
        <ReportFilters onApplyFilters={handleFilterChange} />
        {selectedUserId ? (
          <Suspense fallback={<LoadingSpinner text="Generating report..." />}>
            <MonthlySummaryReport
              key={`${selectedUserId}-${reportFilters.year}-${reportFilters.month}`}
              userId={selectedUserId}
              year={reportFilters.year}
              month={reportFilters.month}
            />
          </Suspense>
        ) : (
          <p className="text-gray-500 mt-4">
            Please select a user to view a report.
          </p>
        )}
      </section>
    </div>
  );
}
