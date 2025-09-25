const BASE_URL = "http://127.0.0.1:8000/api"; // Django backend URL

// Users
export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users/`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function addUser(name: string) {
  const res = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
}

// Expenses
export async function fetchExpenses(userId: number) {
  const res = await fetch(`${BASE_URL}/expenses/?user_id=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
}

export async function addExpense(expense: {
  user: number;
  category: number;
  amount: number;
  date: string;
  description: string;
}) {
  const res = await fetch(`${BASE_URL}/expenses/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Failed to add expense");
  return res.json();
}

// Categories
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories/`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function addCategory(name: string) {
  const res = await fetch(`${BASE_URL}/categories/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to add category");
  return res.json();
}

// Monthly Summary
export async function fetchMonthlySummary(userId: number, year: number, month: number) {
  const res = await fetch(`${BASE_URL}/users/${userId}/monthly-summary/?year=${year}&month=${month}`);
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}
