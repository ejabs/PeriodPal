import React, { createContext, useContext, useState } from "react";

interface CycleData {
  lastPeriodStart: Date;
  cycleLength: number;
  periodLength: number;
}

interface CycleContextType {
  cycleData: CycleData;
  setCycleData: (data: CycleData) => void;
}

const CycleContext = createContext<CycleContextType | undefined>(undefined);

export const CycleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cycleData, setCycleData] = useState<CycleData>({
    lastPeriodStart: new Date(new Date().setDate(new Date().getDate() - 10)),
    cycleLength: 28,
    periodLength: 5,
  });

  return (
    <CycleContext.Provider value={{ cycleData, setCycleData }}>
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => {
  const context = useContext(CycleContext);
  if (!context) {
    throw new Error("useCycle must be used within a CycleProvider");
  }
  return context;
};
