import React, { useState } from 'react';
import { addExpense } from '../../lib/api';
import { type Expense, type ExpenseCategory, EXPENSE_CATEGORIES } from '../../lib/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface ExpenseEntryFormProps {
  userId: string;
  onExpenseAdded: (newExpense: Expense) => void; 
}

export function ExpenseEntryForm({ userId, onExpenseAdded }: ExpenseEntryFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(EXPENSE_CATEGORIES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!description || !amount || !category || !userId) {
      setError('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newExpenseData: Omit<Expense, "id"> = {
        userId,
        description,
        amount: parseFloat(amount),
        category, // Now correctly typed as ExpenseCategory
        date: new Date().toISOString().split('T')[0], // Use today's date
      };

      const addedExpense = await addExpense(newExpenseData);

      setDescription('');
      setAmount('');
      setCategory(EXPENSE_CATEGORIES[0]);

      onExpenseAdded(addedExpense);

    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Description Field */}
        <div className="md:col-span-3">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
            required
          />
        </div>

        {/* Amount Field */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount ($)
          </label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        {/* Category Field */}
        <div className="md:col-span-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="mt-1"
            required
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Expense'}
        </Button>
      </div>
    </form>
  );
}