
import { useState, useEffect } from 'react';
import { calculateCyclePhases, CycleData, formatDate } from '@/lib/cycleCalculations';

interface CycleVisualizerProps {
  cycleData: CycleData;
}

const CycleVisualizer = ({ cycleData }: CycleVisualizerProps) => {
  const [cycleResults, setCycleResults] = useState(calculateCyclePhases(cycleData));
  
  // Update cycle visualization when cycle data changes
  useEffect(() => {
    setCycleResults(calculateCyclePhases(cycleData));
  }, [cycleData]);
  
  // Calculate cycle progress percentage
  const calculateProgress = () => {
    const { lastPeriodStart, cycleLength } = cycleData;
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24));
    const progress = (daysPassed % cycleLength) / cycleLength * 100;
    return Math.min(Math.max(progress, 0), 100);
  };
  
  return (
    <div className="glass-card animate-enter">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Cycle</h3>
        
        {/* Current phase information */}
        <div className={`${cycleResults.currentPhase.color} rounded-xl p-4 mt-2 mb-4`}>
          <p className="text-sm opacity-80">Current Phase</p>
          <p className="text-lg font-medium">{cycleResults.currentPhase.name}</p>
          <p className="text-sm mt-1">{cycleResults.currentPhase.description}</p>
        </div>
        
        {/* Cycle progress bar */}
        <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-app-blush via-app-teal to-app-peach rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${calculateProgress()}%` }}
            aria-label="Cycle progress"
          />
        </div>
        
        {/* Key dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Next Period</p>
            <p className="font-medium">{formatDate(cycleResults.nextPeriodStart)}</p>
            <p className="text-sm">{cycleResults.daysUntilNextPeriod} days to go</p>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Ovulation Day</p>
            <p className="font-medium">{formatDate(cycleResults.ovulationDate)}</p>
          </div>
        </div>
        
        {/* Fertile window */}
        <div className="bg-app-teal/20 rounded-lg p-3">
          <p className="text-xs text-muted-foreground">Fertile Window</p>
          <p className="font-medium">
            {formatDate(cycleResults.fertileWindowStart)} — {formatDate(cycleResults.fertileWindowEnd)}
          </p>
        </div>
      </div>
      
      {/* Cycle phases visualization */}
      <div className="flex items-center space-x-1 h-12 mb-2 overflow-hidden rounded-lg">
        {cycleResults.allPhases.map((phase, index) => {
          // Calculate width based on duration of phase
          const daysInPhase = 
            Math.floor((phase.endDate.getTime() - phase.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          const phaseWidth = (daysInPhase / cycleData.cycleLength) * 100;
          
          return (
            <div
              key={index}
              className={`h-full ${phase.color} transition-all duration-300 hover:opacity-90`}
              style={{ width: `${phaseWidth}%` }}
              title={`${phase.name}: ${formatDate(phase.startDate)} to ${formatDate(phase.endDate)}`}
            >
              {phaseWidth > 10 && (
                <div className="h-full flex items-center justify-center text-xs font-medium px-2 truncate">
                  {phase.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Day 1</span>
          <span>Day {cycleData.cycleLength}</span>
        </div>
      </div>
    </div>
  );
};

export default CycleVisualizer;
