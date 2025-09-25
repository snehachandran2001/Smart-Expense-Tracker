import { Suspense, useState, use, startTransition, useCallback } from 'react';
import { fetchUsers } from '../lib/api';
import { type User, type Expense } from '../lib/types';
import { Select } from '../components/ui/Select';
import { ExpenseList } from '../components/sections/ExpenseList';
import { ExpenseEntryForm } from '../components/forms/ExpenseEntryForm';
import { ReportFilters } from '../components/forms/ReportFilters';
import { MonthlySummaryReport } from '../components/sections/MonthlySummaryReport';

// Fetch the users once, outside of the component render cycle.
const usersPromise = fetchUsers();

function UserSelector({ users, selectedUserId, onUserChange }: { users: User[], selectedUserId: string, onUserChange: (userId: string) => void }) {
    return (
        <div>
            <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
                Select User
            </label>
            <Select
                id="user-select"
                className="mt-1"
                value={selectedUserId}
                onChange={(e) => onUserChange(e.target.value)}
            >
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </Select>
        </div>
    );
}

function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex justify-center items-center p-8">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-500">{text}</p>
        </div>
    );
}

export function HomePage() {
    const users = use(usersPromise) as User[];
    const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || '');
    const [expenseListKey, setExpenseListKey] = useState(Date.now());
    const [reportFilters, setReportFilters] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    });

    const handleExpenseAdded = useCallback((newExpense: Expense) => {
        if (newExpense.userId === selectedUserId) {
            startTransition(() => {
                setExpenseListKey(Date.now());
            });
        }
    }, [selectedUserId]);

    const handleFilterChange = useCallback((filters: { year: number; month: number }) => {
        startTransition(() => {
            setReportFilters(filters);
        });
    }, []);

    return (
        <div className="space-y-12">
            <section>
                <UserSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    onUserChange={setSelectedUserId}
                />
            </section>

            <section>
                <h2 className="text-xl font-semibold border-b pb-2 mb-4">Add New Expense</h2>
                {selectedUserId ? (
                    <ExpenseEntryForm
                        userId={selectedUserId}
                        onExpenseAdded={handleExpenseAdded}
                    />
                ) : (
                    <p className="text-gray-500">Please select a user to add an expense.</p>
                )}
            </section>

            <section>
                <h2 className="text-xl font-semibold border-b pb-2 mb-4">Your Expenses</h2>
                {selectedUserId ? (
                    <Suspense fallback={<LoadingSpinner text="Loading expenses..." />}>
                        <ExpenseList key={`${selectedUserId}-${expenseListKey}`} userId={selectedUserId} />
                    </Suspense>
                ) : (
                    <p className="text-gray-500">Please select a user to see their expenses.</p>
                )}
            </section>

            <section>
                <h2 className="text-xl font-semibold border-b pb-2 mb-4">Monthly Report</h2>
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
                    <p className="text-gray-500 mt-4">Please select a user to view a report.</p>
                )}
            </section>
        </div>
    );
}
