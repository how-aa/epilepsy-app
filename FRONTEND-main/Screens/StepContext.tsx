import React, { createContext, useState, useContext, ReactNode } from 'react';

type StepContextType = {
  sleepFatigue: boolean;
  medicationAdherence: boolean;
  mentalHealth: boolean;
  alcoholSubstanceUse: boolean;
  physicalActivity: boolean;
  foodDiet: boolean;
  menstrualCycle: boolean;
  stepNb: number;
  selectedDate: string;
  setStepValue: (
    key: keyof Omit<StepContextType, 'setStepValue' | 'setStepNb' | 'stepNb' | 'selectedDate' | 'setSelectedDate'>,
    value: boolean
  ) => void;
  setStepNb: (value: number) => void;
  setSelectedDate: (value: string) => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState({
    sleepFatigue: false,
    medicationAdherence: false,
    mentalHealth: false,
    alcoholSubstanceUse: false,
    physicalActivity: false,
    foodDiet: false,
    menstrualCycle: false,
  });

  const [stepNb, setStepNb] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  const setStepValue = (
    key: keyof Omit<StepContextType, 'setStepValue' | 'setStepNb' | 'stepNb' | 'selectedDate' | 'setSelectedDate'>,
    value: boolean
  ) => {
    setSteps((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <StepContext.Provider
      value={{
        ...steps,
        stepNb,
        selectedDate,
        setStepValue,
        setStepNb,
        setSelectedDate,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStep = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
};
