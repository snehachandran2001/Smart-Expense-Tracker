import React, { useState } from 'react';
import { Select } from '../ui/Select';

interface ReportFiltersProps {
  // Callback to inform the parent component of the selected filters
  onApplyFilters: (filters: { year: number; month: number }) => void;
}

// Generate a list of years for the dropdown (e.g., last 5 years)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const months = [
  { value: 1, name: 'January' }, { value: 2, name: 'February' },
  { value: 3, name: 'March' }, { value: 4, name: 'April' },
  { value: 5, name: 'May' }, { value: 6, name: 'June' },
  { value: 7, name: 'July' }, { value: 8, name: 'August' },
  { value: 9, name: 'September' }, { value: 10, name: 'October' },
  { value: 11, name: 'November' }, { value: 12, name: 'December' },
];

export function ReportFilters({ onApplyFilters }: ReportFiltersProps) {
  // Default to the current year and month
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // Apply filters whenever a selection changes
  React.useEffect(() => {
    onApplyFilters({ year, month });
  }, [year, month, onApplyFilters]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div>
        <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <Select
          id="year-filter"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
          className="mt-1"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </Select>
      </div>
      <div>
        <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700">
          Month
        </label>
        <Select
          id="month-filter"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value, 10))}
          className="mt-1"
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.name}</option>
          ))}
        </Select>
      </div>
    </div>
  );
}