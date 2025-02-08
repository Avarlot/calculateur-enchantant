import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CalculationResult {
  year: number;
  amount: number;
  amount2?: number;
}

const Calculator = () => {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);
  const [compareMode, setCompareMode] = useState(false);
  const [interestRate2, setInterestRate2] = useState(7);
  const [initialAmount2, setInitialAmount2] = useState(1000);
  const [monthlyContribution2, setMonthlyContribution2] = useState(100);
  const [years2, setYears2] = useState(10);

  const syncValues = () => {
    setInitialAmount2(initialAmount);
    setMonthlyContribution2(monthlyContribution);
    setYears2(years);
  };

  const calculateResults = (): CalculationResult[] => {
    const results: CalculationResult[] = [];
    let balance = initialAmount;
    let balance2 = compareMode ? initialAmount2 : initialAmount;
    const maxYears = Math.max(years, years2);

    for (let year = 0; year <= maxYears; year++) {
      const result: CalculationResult = {
        year,
        amount: Math.round(balance),
      };

      if (compareMode && year <= years2) {
        result.amount2 = Math.round(balance2);
      }

      results.push(result);

      if (year < years) {
        balance = (balance + monthlyContribution * 12) * (1 + interestRate / 100);
      }
      if (compareMode && year < years2) {
        balance2 = (balance2 + monthlyContribution2 * 12) * (1 + interestRate2 / 100);
      }
    }

    return results;
  };

  const results = calculateResults();
  const finalAmount = results[years].amount;
  const finalAmount2 = compareMode ? results[years2].amount2 : undefined;

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
              <div className="space-y-2">
                <Label>Montant initial: {initialAmount}€</Label>
                <Slider
                  value={[initialAmount]}
                  onValueChange={([value]) => setInitialAmount(value)}
                  min={0}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Contribution mensuelle: {monthlyContribution}€
                </Label>
                <Slider
                  value={[monthlyContribution]}
                  onValueChange={([value]) => setMonthlyContribution(value)}
                  min={0}
                  max={5000}
                  step={50}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Taux d'intérêt annuel: {interestRate}%</Label>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={0}
                  max={20}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Période (années): {years}</Label>
                <Slider
                  value={[years]}
                  onValueChange={([value]) => setYears(value)}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={compareMode}
                  onCheckedChange={setCompareMode}
                />
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

                  <div className="space-y-2">
                    <Label>Montant initial: {initialAmount2}€</Label>
                    <Slider
                      value={[initialAmount2]}
                      onValueChange={([value]) => setInitialAmount2(value)}
                      min={0}
                      max={100000}
                      step={1000}
                      className="w-full [&>.bg-primary]:bg-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Contribution mensuelle: {monthlyContribution2}€
                    </Label>
                    <Slider
                      value={[monthlyContribution2]}
                      onValueChange={([value]) => setMonthlyContribution2(value)}
                      min={0}
                      max={5000}
                      step={50}
                      className="w-full [&>.bg-primary]:bg-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Taux d'intérêt stratégie 2: {interestRate2}%
                    </Label>
                    <Slider
                      value={[interestRate2]}
                      onValueChange={([value]) => setInterestRate2(value)}
                      min={0}
                      max={20}
                      step={0.1}
                      className="w-full [&>.bg-primary]:bg-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Période stratégie 2 (années): {years2}</Label>
                    <Slider
                      value={[years2]}
                      onValueChange={([value]) => setYears2(value)}
                      min={1}
                      max={50}
                      step={1}
                      className="w-full [&>.bg-primary]:bg-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={results}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="year"
                    label={{
                      value: "Années",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Montant (€)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("fr-FR", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(value)
                    }
                  />
                  <Tooltip
                    formatter={(value: number) =>
                      new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(value)
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#ed6b06"
                    strokeWidth={2}
                    dot={false}
                    name="Stratégie 1"
                  />
                  {compareMode && (
                    <Line
                      type="monotone"
                      dataKey="amount2"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                      name="Stratégie 2"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
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
