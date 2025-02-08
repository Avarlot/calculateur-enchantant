
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalculationResult } from "@/types/calculator";

interface ResultsChartProps {
  results: CalculationResult[];
  compareMode: boolean;
}

export const ResultsChart = ({ results, compareMode }: ResultsChartProps) => {
  return (
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
  );
};
