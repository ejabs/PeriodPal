
import { CyclePhase } from '@/lib/cycleCalculations';
import { cn } from '@/lib/utils';

interface CyclePhaseCardProps {
  phase: CyclePhase;
  isActive?: boolean;
}

const CyclePhaseCard = ({ phase, isActive = false }: CyclePhaseCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-xl p-4 transition-all duration-300 shadow-sm",
        phase.color,
        isActive ? "transform scale-[1.02]" : "opacity-80 hover:opacity-100"
      )}
    >
      <div className="flex flex-col h-full">
        <h3 className="font-medium text-lg mb-2">{phase.name}</h3>
        <p className="text-sm flex-grow">{phase.description}</p>
      </div>
    </div>
  );
};

export default CyclePhaseCard;
