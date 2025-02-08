
export interface CalculationResult {
  year: number;
  amount: number;
  amount2?: number;
}

export interface CalculatorState {
  initialAmount: number;
  monthlyContribution: number;
  interestRate: number;
  years: number;
}
