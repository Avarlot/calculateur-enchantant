
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CalculatorState } from "@/types/calculator";

interface StrategyInputsProps {
  strategy: CalculatorState;
  onUpdate: (key: keyof CalculatorState, value: number) => void;
  isSecondStrategy?: boolean;
}

export const StrategyInputs = ({
  strategy,
  onUpdate,
  isSecondStrategy = false,
}: StrategyInputsProps) => {
  const sliderClassName = `w-full ${
    isSecondStrategy ? "[&>.bg-primary]:bg-blue-600" : ""
  }`;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Montant initial: {strategy.initialAmount}€</Label>
        <Slider
          value={[strategy.initialAmount]}
          onValueChange={([value]) => onUpdate("initialAmount", value)}
          min={0}
          max={100000}
          step={1000}
          className={sliderClassName}
        />
      </div>

      <div className="space-y-2">
        <Label>Contribution mensuelle: {strategy.monthlyContribution}€</Label>
        <Slider
          value={[strategy.monthlyContribution]}
          onValueChange={([value]) => onUpdate("monthlyContribution", value)}
          min={0}
          max={5000}
          step={50}
          className={sliderClassName}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Taux d'intérêt{isSecondStrategy ? " stratégie 2" : " annuel"}: {strategy.interestRate}%
        </Label>
        <Slider
          value={[strategy.interestRate]}
          onValueChange={([value]) => onUpdate("interestRate", value)}
          min={0}
          max={20}
          step={0.1}
          className={sliderClassName}
        />
      </div>

      <div className="space-y-2">
        <Label>
          Période{isSecondStrategy ? " stratégie 2" : ""} (années): {strategy.years}
        </Label>
        <Slider
          value={[strategy.years]}
          onValueChange={([value]) => onUpdate("years", value)}
          min={1}
          max={50}
          step={1}
          className={sliderClassName}
        />
      </div>
    </div>
  );
};
