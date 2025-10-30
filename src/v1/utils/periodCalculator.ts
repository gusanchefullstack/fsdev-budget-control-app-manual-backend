import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  nextMonday,
} from "date-fns";
import { eachQuarterOfInterval } from "date-fns/fp";

const dailyPeriods = (startDate: string, endDate: string) => {
  const intervals = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  return intervals;
};

const weeklyPeriods = (startDate: string, endDate: string) => {
  const intervals = eachWeekOfInterval(
    {
      start: startDate,
      end: endDate,
    },
    { weekStartsOn: 1 }
  );
  return intervals;
};

const monthlyPeriods = (startDate: string, endDate: string) => {
  const intervals = eachMonthOfInterval({
    start: startDate,
    end: endDate,
  });
  return intervals;
};

const quarterlyPeriods = (startDate: string, endDate: string) => {
  const intervals = eachQuarterOfInterval({
    start: startDate,
    end: endDate,
  });
  return intervals;
};

const annualPeriods = (startDate: string, endDate: string) => {
  const intervals = eachYearOfInterval({
    start: startDate,
    end: endDate,
  });
  return intervals;
};

const semiAnnualPeriods = (startDate: string, endDate: string) => {
  const days = differenceInCalendarDays(endDate, startDate);
  if (days > 180) {
    return [addDays(startDate, 1), addDays(startDate, 181)];
  } else {
    return [addDays(startDate, 1)];
  }
};

const oneTime = (oneDate: string) => {
  return [nextMonday(oneDate)];
};

export default {
  dailyPeriods,
  weeklyPeriods,
  monthlyPeriods,
  quarterlyPeriods,
  semiAnnualPeriods,
  annualPeriods,
  oneTime,
};


// const s = new Date(2025, 0, 1);
// const e = new Date(2025, 9, 27);
// const test1 = oneTime(s.toString())
// const test2 = dailyPeriods(s.toString(),e.toString())
// const test3 = weeklyPeriods(s.toString(),e.toString())
// const test4 = monthlyPeriods(s.toString(),e.toString())
// const test5 = quarterlyPeriods(s.toString(),e.toString())
// const test6 = semiAnnualPeriods(s.toString(),e.toString())
// const test7 = annualPeriods(s.toString(),e.toString())
// console.log(test1)
// console.log(test2)
// console.log(test3)
// console.log(test4)
// console.log(test5)
// console.log(test6)
// console.log(test7)
// console.log(test7[0])
// console.log(typeof(test7[0]))
// console.log(test7[0].toISOString())

