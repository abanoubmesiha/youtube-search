import { FilterDates } from '../../types/search';

export const from1970 = '1970-01-01T00:00:00Z';

export const findClosestDate = (targetDate: string | null, dates: FilterDates): {
  value: string | null, name: string
} => {
  if (!targetDate) return { value: null, name: '' };
  if (targetDate !== from1970) {
    if (targetDate < dates.today && targetDate < dates.lastWeek && targetDate < dates.lastMonth) {
      return { value: dates.lastYear, name: '1 year ago' };
    }
    if (targetDate < dates.today && targetDate < dates.lastWeek) {
      return { value: dates.lastMonth, name: '1 month ago' };
    }
    if (targetDate < dates.today) {
      return { value: dates.lastWeek, name: '1 week ago' };
    }
    return { value: dates.today, name: 'today' };
  }
  return { value: from1970, name: 'anytime' };
};

export const createFilterDates = () => {
  let now = new Date();
  const yesterday = now.getDate() - 1;
  const today = new Date(now.setDate(yesterday));
  now = new Date();
  const lastWeekDay = now.getDate() - 6;
  const lastWeek = new Date(now.setDate(lastWeekDay));
  now = new Date();
  const lastMonthNum = now.getMonth() - 1;
  const lastMonth = new Date(now.setMonth(lastMonthNum));
  now = new Date();
  const lastYearNum = now.getFullYear() - 1;
  const lastYear = new Date(now.setFullYear(lastYearNum));
  return {
    today: today.toISOString(),
    lastWeek: lastWeek.toISOString(),
    lastMonth: lastMonth.toISOString(),
    lastYear: lastYear.toISOString(),
  };
};
