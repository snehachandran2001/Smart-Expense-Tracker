import { Suspense } from 'react';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Smart Expense Tracker</h1>
        <p className="mt-2 text-lg text-gray-600">A proof-of-concept for managing personal expenses.</p>
      </header>

      <Suspense fallback={<div className="text-center p-12">Loading application...</div>}>
        <HomePage />
      </Suspense>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Smart Expense Tracker. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default App;