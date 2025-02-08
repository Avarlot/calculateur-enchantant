
import { CalculationResult, CalculatorState } from "../types/calculator";

export const calculateResults = (
  strategy1: CalculatorState,
  strategy2?: CalculatorState,
  compareMode: boolean = false
): CalculationResult[] => {
  const results: CalculationResult[] = [];
  let balance = strategy1.initialAmount;
  let balance2 = compareMode ? strategy2?.initialAmount ?? strategy1.initialAmount : strategy1.initialAmount;
  const maxYears = Math.max(strategy1.years, strategy2?.years ?? strategy1.years);

  for (let year = 0; year <= maxYears; year++) {
    const result: CalculationResult = {
      year,
      amount: Math.round(balance),
    };

    if (compareMode && strategy2 && year <= strategy2.years) {
      result.amount2 = Math.round(balance2);
    }

    results.push(result);

    if (year < strategy1.years) {
      balance = (balance + strategy1.monthlyContribution * 12) * (1 + strategy1.interestRate / 100);
    }
    if (compareMode && strategy2 && year < strategy2.years) {
      balance2 = (balance2 + strategy2.monthlyContribution * 12) * (1 + strategy2.interestRate / 100);
    }
  }

  return results;
};
