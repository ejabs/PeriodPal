import { addDays, differenceInDays, format, startOfDay } from "date-fns";
export interface CycleData {
  lastPeriodStart: Date;
  cycleLength: number;
  periodLength: number;
}

export interface CyclePhase {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  color: string;
}

export interface PredictionResult {
  nextPeriodStart: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  safeWindowPreOvulation: {
    start: Date;
    end: Date;
  };
  safeWindowPostOvulation: {
    start: Date;
    end: Date;
  };
  currentPhase: CyclePhase;
  allPhases: CyclePhase[];
  daysUntilNextPeriod: number;
  currentCycleDay: number; // Added to track the current cycle day
}

export const calculateCyclePhases = (
  cycleData: CycleData
): PredictionResult => {
  const { lastPeriodStart, cycleLength, periodLength } = cycleData;

  // Standardize to start of day to avoid time-of-day calculation issues
  const startDate = startOfDay(lastPeriodStart);
  const today = startOfDay(new Date());

  // Calculate Current Cycle Day
  let currentCycleDay = 0;
  if (startDate <= today) {
    currentCycleDay = differenceInDays(today, startDate) + 1;
  }

  // Calculate Next Period Start
  let nextPeriodStart = addDays(startDate, cycleLength);
  if (startDate > today) {
    // If lastPeriodStart is in the future, next period is the selected date
    nextPeriodStart = startDate;
  }

  // Calculate Days Until Next Period
  const daysUntilNextPeriod = Math.max(
    0,
    differenceInDays(nextPeriodStart, today)
  );

  // Calculate key dates (only if lastPeriodStart is in the past)
  let periodEndDate = addDays(startDate, periodLength - 1);
  let ovulationDate = addDays(startDate, Math.floor(cycleLength / 2) - 2);
  let fertileWindowStart = addDays(ovulationDate, -5);
  let fertileWindowEnd = addDays(ovulationDate, 1);

  // Calculate safe windows
  let safeWindowPreOvulation = {
    start: addDays(periodEndDate, 1),
    end: addDays(fertileWindowStart, -1),
  };

  let safeWindowPostOvulation = {
    start: addDays(fertileWindowEnd, 1),
    end: addDays(nextPeriodStart, -1),
  };

  // If lastPeriodStart is in the future, adjust phases to reflect future cycle
  if (startDate > today) {
    periodEndDate = addDays(startDate, periodLength - 1);
    ovulationDate = addDays(startDate, Math.floor(cycleLength / 2) - 2);
    fertileWindowStart = addDays(ovulationDate, -5);
    fertileWindowEnd = addDays(ovulationDate, 1);

    safeWindowPreOvulation = {
      start: addDays(periodEndDate, 1),
      end: addDays(fertileWindowStart, -1),
    };

    safeWindowPostOvulation = {
      start: addDays(fertileWindowEnd, 1),
      end: addDays(nextPeriodStart, -1),
    };
  }

  // Create all cycle phases
  const allPhases: CyclePhase[] = [
    {
      name: "Menstruation",
      startDate: startDate,
      endDate: periodEndDate,
      description:
        "Your period is happening now. Take care of yourself and track any symptoms.",
      color: "bg-app-blush",
    },
    {
      name: "Follicular Phase",
      startDate: addDays(startDate, periodLength),
      endDate: addDays(ovulationDate, -1),
      description:
        "Your body is preparing for ovulation. Energy levels typically rise during this time.",
      color: "bg-app-lavender/60",
    },
    {
      name: "Ovulation",
      startDate: ovulationDate,
      endDate: ovulationDate,
      description:
        "Your body is releasing an egg. This is when you're most fertile.",
      color: "bg-app-teal",
    },
    {
      name: "Fertile Window",
      startDate: fertileWindowStart,
      endDate: fertileWindowEnd,
      description:
        "This is when you're most likely to conceive if you have unprotected sex.",
      color: "bg-app-teal/70",
    },
    {
      name: "Safe Period (Pre-Ovulation)",
      startDate: safeWindowPreOvulation.start,
      endDate: safeWindowPreOvulation.end,
      description:
        "Lower chance of pregnancy, but still use protection if not planning to conceive.",
      color: "bg-app-sage/60",
    },
    {
      name: "Safe Period (Post-Ovulation)",
      startDate: safeWindowPostOvulation.start,
      endDate: safeWindowPostOvulation.end,
      description:
        "Lower chance of pregnancy, but still use protection if not planning to conceive.",
      color: "bg-app-sage/60",
    },
    {
      name: "Luteal Phase",
      startDate: addDays(ovulationDate, 1),
      endDate: addDays(nextPeriodStart, -1),
      description:
        "Your body is preparing either for pregnancy or menstruation. You may experience PMS symptoms.",
      color: "bg-app-peach/70",
    },
  ];

  // Determine current phase
  let currentPhase = allPhases[allPhases.length - 1]; // Default to luteal phase

  for (const phase of allPhases) {
    if (
      differenceInDays(today, phase.startDate) >= 0 &&
      differenceInDays(phase.endDate, today) >= 0
    ) {
      currentPhase = phase;
      break;
    }
  }

  return {
    nextPeriodStart,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    safeWindowPreOvulation,
    safeWindowPostOvulation,
    currentPhase,
    allPhases,
    daysUntilNextPeriod,
    currentCycleDay, // Added to track the current cycle day
  };
};

export const formatDate = (date: Date): string => {
  return format(date, "MMM d, yyyy");
};

export const getSymptomOptions = () => {
  return [
    { id: "cramps", label: "Cramps", category: "physical" },
    { id: "headache", label: "Headache", category: "physical" },
    { id: "backache", label: "Backache", category: "physical" },
    { id: "fatigue", label: "Fatigue", category: "physical" },
    { id: "bloating", label: "Bloating", category: "physical" },
    {
      id: "breastTenderness",
      label: "Breast Tenderness",
      category: "physical",
    },
    { id: "acne", label: "Acne", category: "physical" },
    { id: "cravings", label: "Cravings", category: "physical" },
    { id: "insomnia", label: "Insomnia", category: "physical" },
    { id: "nausea", label: "Nausea", category: "physical" },
    { id: "mood_swings", label: "Mood Swings", category: "emotional" },
    { id: "anxiety", label: "Anxiety", category: "emotional" },
    { id: "irritability", label: "Irritability", category: "emotional" },
    { id: "depression", label: "Depression", category: "emotional" },
    { id: "stress", label: "Stress", category: "emotional" },
    { id: "spotting", label: "Spotting", category: "flow" },
    { id: "light", label: "Light Flow", category: "flow" },
    { id: "medium", label: "Medium Flow", category: "flow" },
    { id: "heavy", label: "Heavy Flow", category: "flow" },
  ];
};

export const getMockHealthcareLocations = () => {
  return [
    {
      id: 1,
      name: "Women's Health Center",
      address: "123 Main Street, Anytown",
      phone: "(555) 123-4567",
      type: "Clinic",
      distance: "0.8 miles",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: 2,
      name: "Memorial Hospital",
      address: "456 Oak Avenue, Anytown",
      phone: "(555) 987-6543",
      type: "Hospital",
      distance: "1.2 miles",
      coordinates: { lat: 40.7148, lng: -74.013 },
    },
    {
      id: 3,
      name: "Community Healthcare",
      address: "789 Elm Street, Anytown",
      phone: "(555) 456-7890",
      type: "Clinic",
      distance: "1.5 miles",
      coordinates: { lat: 40.711, lng: -74.009 },
    },
    {
      id: 4,
      name: "University Medical Center",
      address: "101 College Road, Anytown",
      phone: "(555) 234-5678",
      type: "Hospital",
      distance: "2.3 miles",
      coordinates: { lat: 40.718, lng: -74.001 },
    },
    {
      id: 5,
      name: "Riverside Clinic",
      address: "222 River Road, Anytown",
      phone: "(555) 345-6789",
      type: "Clinic",
      distance: "3.0 miles",
      coordinates: { lat: 40.709, lng: -74.018 },
    },
  ];
};

export const getHealthAdviceCategories = () => {
  return [
    {
      id: "period",
      title: "Period Management",
      icon: "droplet",
      color: "bg-app-blush",
      description:
        "Tips for managing period symptoms and taking care of yourself during menstruation.",
    },
    {
      id: "fertility",
      title: "Fertility & Ovulation",
      icon: "heart",
      color: "bg-app-teal",
      description:
        "Understanding your fertile window and optimizing reproductive health.",
    },
    {
      id: "pregnancy",
      title: "Pregnancy Health",
      icon: "baby",
      color: "bg-app-peach",
      description:
        "Health tips and information for a healthy pregnancy and prenatal care.",
    },
    {
      id: "lifestyle",
      title: "Lifestyle & Wellness",
      icon: "activity",
      color: "bg-app-lavender",
      description:
        "General wellness advice for reproductive health and hormone balance.",
    },
  ];
};
