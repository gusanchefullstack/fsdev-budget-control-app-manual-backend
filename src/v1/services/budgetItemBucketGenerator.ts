import periodCalculator from "#v1/utils/periodCalculator.js";
import {
  BudgetItemBucket,
  BudgetItemFrequency,
} from "#generated/prisma/index.js";
export const BudgetItemBucketGenerator = (
  startDate: string,
  endDate: string,
  estimatedAmount: number,
  frequency: BudgetItemFrequency
) => {
  let periods = [];

  switch (frequency) {
    case BudgetItemFrequency.DAILY:
      periods = periodCalculator.dailyPeriods(startDate, endDate);
      break;
    case BudgetItemFrequency.WEEKLY:
      periods = periodCalculator.weeklyPeriods(startDate, endDate);
      break;
    case BudgetItemFrequency.MONTHLY:
      periods = periodCalculator.monthlyPeriods(startDate, endDate);
      break;
    case BudgetItemFrequency.QUARTERLY:
      periods = periodCalculator.quarterlyPeriods(startDate, endDate);
      break;
    case BudgetItemFrequency.SEMIANNUAL:
      periods = periodCalculator.semiAnnualPeriods(startDate, endDate);

      break;
    case BudgetItemFrequency.ANNUALLY:
      periods = periodCalculator.annualPeriods(startDate, endDate);
      break;
    case BudgetItemFrequency.ONETIME:
      periods = periodCalculator.oneTime(startDate);
      break;
  }
  const buckets: BudgetItemBucket[] = periods.map((period) => {
    return {
      estimatedAmount,
      currentAmount: 0,
      estimatedDate: period,
      currentDate: period,
    };
  });
  return buckets;
};
