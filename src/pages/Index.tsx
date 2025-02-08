
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalculatorState } from "@/types/calculator";
import { calculateResults } from "@/utils/calculatorUtils";
import { StrategyInputs } from "@/components/calculator/StrategyInputs";
import { ResultsChart } from "@/components/calculator/ResultsChart";

const Calculator = () => {
  const [strategy1, setStrategy1] = useState<CalculatorState>({
    initialAmount: 1000,
    monthlyContribution: 100,
    interestRate: 5,
    years: 10,
  });

  const [strategy2, setStrategy2] = useState<CalculatorState>({
    initialAmount: 1000,
    monthlyContribution: 100,
    interestRate: 7,
    years: 10,
  });

  const [compareMode, setCompareMode] = useState(false);

  const updateStrategy1 = (key: keyof CalculatorState, value: number) => {
    setStrategy1((prev) => ({ ...prev, [key]: value }));
  };

  const updateStrategy2 = (key: keyof CalculatorState, value: number) => {
    setStrategy2((prev) => ({ ...prev, [key]: value }));
  };

  const syncValues = () => {
    setStrategy2(strategy1);
  };

  const results = calculateResults(strategy1, strategy2, compareMode);
  const finalAmount = results[strategy1.years].amount;
  const finalAmount2 = compareMode ? results[strategy2.years].amount2 : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-slide-up">
        <div className="text-center space-y-2">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
            Calculateur
          </span>
          <h1 className="text-4xl font-bold text-gray-900">
            Calculateur d'Intérêts Composés
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualisez la croissance de vos investissements dans le temps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card p-6 space-y-6">
            <div className="space-y-4">
              <StrategyInputs strategy={strategy1} onUpdate={updateStrategy1} />

              <div className="flex items-center space-x-2">
                <Switch checked={compareMode} onCheckedChange={setCompareMode} />
                <Label>Comparer deux stratégies</Label>
              </div>

              {compareMode && (
                <div className="space-y-4 animate-slide-up border-t pt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-700">
                      Paramètres de la stratégie 2
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={syncValues}
                      className="text-sm"
                    >
                      Copier les valeurs de la stratégie 1
                    </Button>
                  </div>

                  <StrategyInputs
                    strategy={strategy2}
                    onUpdate={updateStrategy2}
                    isSecondStrategy
                  />
                </div>
              )}
            </div>
          </Card>

          <Card className="glass-card p-6">
            <ResultsChart results={results} compareMode={compareMode} />
          </Card>
        </div>

        <Card className="glass-card p-6">
          <div className="grid md:grid-cols-2 gap-4 text-center">
            <div>
              <h3 className="text-lg font-medium text-gray-600">
                Montant final (Stratégie 1)
              </h3>
              <p className="text-3xl font-bold text-primary">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(finalAmount)}
              </p>
            </div>
            {compareMode && finalAmount2 !== undefined && (
              <div className="animate-slide-up">
                <h3 className="text-lg font-medium text-gray-600">
                  Montant final (Stratégie 2)
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(finalAmount2)}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
