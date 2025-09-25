
export interface User {
  id: string;
  name: string;
}

export const EXPENSE_CATEGORIES = [
  "Groceries",
  "Utilities",
  "Rent",
  "Transportation",
  "Dining Out",
  "Entertainment",
  "Health",
  "Other",
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];

export interface Expense {
  id: string;
  userId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD
}

export interface MonthlySummary {
  totalExpenses: number;
  byCategory: {
    category: ExpenseCategory;
    amount: number;
  }[];
}
