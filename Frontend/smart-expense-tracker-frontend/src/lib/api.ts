// This is a placeholder for your actual API base URL
const API_BASE_URL = 'http://localhost:3001'; // Or whatever your backend server runs on

// ... your existing fetchUsers function

/**
 * Fetches all expenses for a given user.
 * @param userId - The ID of the user whose expenses to fetch.
 * @returns A promise that resolves to an array of expenses.
 */
export async function fetchExpensesForUser(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/expenses`);

    if (!response.ok) {
      // Throw an error with the status text to be caught by the caller
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const expenses = await response.json();
    return expenses;
  } catch (error) {
    console.error(`Failed to fetch expenses for user ${userId}:`, error);
    // Re-throw the error to let the calling component know something went wrong.
    // React's <Suspense> boundary can catch this and show an error UI.
    throw error;
  }
}
