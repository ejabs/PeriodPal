
import React, { useEffect, useState } from 'react';
import { format, addDays, subDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CycleData, calculateCyclePhases } from '@/lib/cycleCalculations';
import { cn } from '@/lib/utils';

interface PeriodPredictorProps {
  cycleData: CycleData;
}

const PeriodPredictor: React.FC<PeriodPredictorProps> = ({ cycleData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [predictions, setPredictions] = useState<any[]>([]);
  
  // Update predictions when cycle data changes
  useEffect(() => {
    // Generate predictions for the next 6 cycles
    const predictNextCycles = () => {
      const cycles = [];
      let lastStart = new Date(cycleData.lastPeriodStart);
      
      for (let i = 0; i < 6; i++) {
        const prediction = calculateCyclePhases({
          ...cycleData,
          lastPeriodStart: lastStart,
        });
        
        cycles.push({
          periodStart: lastStart,
          periodEnd: addDays(lastStart, cycleData.periodLength - 1),
          ovulation: prediction.ovulationDate,
          fertileStart: prediction.fertileWindowStart,
          fertileEnd: prediction.fertileWindowEnd,
          safePreOvulationStart: prediction.safeWindowPreOvulation.start,
          safePreOvulationEnd: prediction.safeWindowPreOvulation.end,
          safePostOvulationStart: prediction.safeWindowPostOvulation.start,
          safePostOvulationEnd: prediction.safeWindowPostOvulation.end,
        });
        
        // Set up next cycle
        lastStart = addDays(lastStart, cycleData.cycleLength);
      }
      
      return cycles;
    };
    
    setPredictions(predictNextCycles());
  }, [cycleData]);
  
  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(subDays(startOfMonth(currentMonth), 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
  };
  
  // Calendar generation
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfMonth(monthStart);
  const endDate = endOfMonth(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Day classification logic
  const getDayClass = (day: Date) => {
    const today = new Date();
    
    // Check if the day is today
    if (isSameDay(day, today)) {
      return "border-2 border-primary font-bold";
    }
    
    // Check if the day is within any predicted phase
    for (const cycle of predictions) {
      // Period days
      if (day >= cycle.periodStart && day <= cycle.periodEnd) {
        return "bg-app-blush text-foreground";
      }
      
      // Ovulation day
      if (isSameDay(day, cycle.ovulation)) {
        return "bg-app-teal text-foreground";
      }
      
      // Fertile window
      if (day >= cycle.fertileStart && day <= cycle.fertileEnd) {
        return "bg-app-teal/50 text-foreground";
      }
      
      // Safe period (pre-ovulation)
      if (day >= cycle.safePreOvulationStart && day <= cycle.safePreOvulationEnd) {
        return "bg-app-sage/60 text-foreground";
      }
      
      // Safe period (post-ovulation)
      if (day >= cycle.safePostOvulationStart && day <= cycle.safePostOvulationEnd) {
        return "bg-app-sage/60 text-foreground";
      }
    }
    
    return "";
  };
  
  return (
    <div className="glass-card animate-enter">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Period Calendar</h3>
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToPreviousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="text-center font-medium mb-2">
        {format(currentMonth, 'MMMM yyyy')}
      </div>
      
      <div className="grid grid-cols-7 text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-sm">
        {days.map((day, i) => (
          <div 
            key={i}
            className={cn(
              "aspect-square flex items-center justify-center rounded-md transition-colors",
              !isSameMonth(day, currentMonth) && "text-muted-foreground/50",
              getDayClass(day)
            )}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-muted text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-app-blush mr-2"></div>
          <span>Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-app-teal mr-2"></div>
          <span>Ovulation</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-app-teal/50 mr-2"></div>
          <span>Fertile Window</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-app-sage/60 mr-2"></div>
          <span>Safe Period</span>
        </div>
      </div>
    </div>
  );
};

export default PeriodPredictor;
