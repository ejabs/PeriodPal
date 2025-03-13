import { useState } from "react";
import Navbar from "@/components/Navbar";
import PeriodPredictor from "@/components/PeriodPredictor";
import SymptomTracker from "@/components/SymptomTracker";
import { useCycle } from "@/context/CycleContext";
import { Calendar as CalendarIcon, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CycleData } from "@/lib/cycleCalculations";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const CalendarPage = () => {
  const { cycleData, setCycleData } = useCycle();
  const [date, setDate] = useState<Date | undefined>(cycleData.lastPeriodStart);

  const updateCycleLength = (length: number) => {
    setCycleData({ ...cycleData, cycleLength: length });
  };

  const updatePeriodLength = (length: number) => {
    setCycleData({ ...cycleData, periodLength: length });
  };

  const updateLastPeriodStart = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setCycleData({ ...cycleData, lastPeriodStart: date });
    }
  };

  const [cycleLengthOptions] = useState([
    { value: 21, label: "21 days" },
    { value: 22, label: "22 days" },
    { value: 23, label: "23 days" },
    { value: 24, label: "24 days" },
    { value: 25, label: "25 days" },
    { value: 26, label: "26 days" },
    { value: 27, label: "27 days" },
    { value: 28, label: "28 days (Average)" },
    { value: 29, label: "29 days" },
    { value: 30, label: "30 days" },
    { value: 31, label: "31 days" },
    { value: 32, label: "32 days" },
    { value: 33, label: "33 days" },
    { value: 34, label: "34 days" },
    { value: 35, label: "35 days" },
  ]);

  const [periodLengthOptions] = useState([
    { value: 3, label: "3 days" },
    { value: 4, label: "4 days" },
    { value: 5, label: "5 days (Average)" },
    { value: 6, label: "6 days" },
    { value: 7, label: "7 days" },
    { value: 8, label: "8 days" },
    { value: 9, label: "9 days" },
    { value: 10, label: "10 days" },
  ]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="pt-6 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-4 animate-fade-in">
            Calendar & Cycle Settings
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Track your period, adjust your cycle settings, and plan ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Cycle settings */}
          <div className="space-y-6">
            <div className="glass-card animate-enter">
              <h3 className="text-lg font-semibold mb-4">Cycle Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Period Start Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
                          updateLastPeriodStart(date);
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Cycle Length
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        {cycleData.cycleLength} days
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <div className="max-h-80 overflow-auto py-1">
                        {cycleLengthOptions.map((option) => (
                          <div
                            key={option.value}
                            className={cn(
                              "flex items-center px-3 py-2 cursor-pointer hover:bg-muted",
                              cycleData.cycleLength === option.value &&
                                "bg-muted"
                            )}
                            onClick={() => updateCycleLength(option.value)}
                          >
                            <span className="flex-grow">{option.label}</span>
                            {cycleData.cycleLength === option.value && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Period Length
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        {cycleData.periodLength} days
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <div className="max-h-60 overflow-auto py-1">
                        {periodLengthOptions.map((option) => (
                          <div
                            key={option.value}
                            className={cn(
                              "flex items-center px-3 py-2 cursor-pointer hover:bg-muted",
                              cycleData.periodLength === option.value &&
                                "bg-muted"
                            )}
                            onClick={() => updatePeriodLength(option.value)}
                          >
                            <span className="flex-grow">{option.label}</span>
                            {cycleData.periodLength === option.value && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Back to Dashboard Button */}
                <div className="pt-4">
                  <Link to="/">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <SymptomTracker />

            <div className="glass-card animate-enter">
              <h3 className="text-lg font-semibold mb-4">About Your Cycle</h3>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    What is a menstrual cycle?
                  </AccordionTrigger>
                  <AccordionContent>
                    The menstrual cycle is the monthly hormonal cycle that the
                    female body goes through to prepare for pregnancy. Each
                    cycle starts on the first day of your period and ends when
                    your next period begins, averaging 28 days but can range
                    from 21-35 days.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    What affects cycle length?
                  </AccordionTrigger>
                  <AccordionContent>
                    Your cycle length can be affected by stress, significant
                    weight changes, excessive exercise, hormonal disorders, age,
                    and certain medications. Keeping track of your cycle helps
                    you notice patterns and changes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Understanding the fertile window
                  </AccordionTrigger>
                  <AccordionContent>
                    The fertile window is typically the 6-day period ending with
                    ovulation. Sperm can survive up to 5 days in the female
                    reproductive tract, and the egg lives for about 24 hours
                    after ovulation. Having intercourse during this window
                    increases chances of pregnancy.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Right column - Calendar */}
          <div className="lg:col-span-2 space-y-6">
            <PeriodPredictor cycleData={cycleData} />

            <div className="glass-card animate-enter">
              <h3 className="text-lg font-semibold mb-4">
                Understanding Your Cycle Phases
              </h3>

              <div className="space-y-4">
                <div className="bg-app-blush/70 rounded-lg p-4">
                  <h4 className="font-medium mb-1">
                    Menstrual Phase (Days 1-5)
                  </h4>
                  <p className="text-sm">
                    This phase begins on the first day of your period. The
                    uterus sheds its lining when pregnancy doesn't occur. During
                    this time, you may experience cramps, fatigue, and mood
                    changes.
                  </p>
                </div>

                <div className="bg-app-lavender/40 rounded-lg p-4">
                  <h4 className="font-medium mb-1">
                    Follicular Phase (Days 1-13)
                  </h4>
                  <p className="text-sm">
                    Overlapping with the menstrual phase, this is when your body
                    prepares an egg for release. Estrogen levels rise, causing
                    the uterine lining to thicken. You may feel increased energy
                    and improved mood.
                  </p>
                </div>

                <div className="bg-app-teal/70 rounded-lg p-4">
                  <h4 className="font-medium mb-1">Ovulation Phase (Day 14)</h4>
                  <p className="text-sm">
                    The egg is released from the ovary and can be fertilized for
                    about 24 hours. Signs include a slight increase in body
                    temperature, changes in cervical mucus, and sometimes mild
                    pain on one side of the abdomen.
                  </p>
                </div>

                <div className="bg-app-peach/70 rounded-lg p-4">
                  <h4 className="font-medium mb-1">
                    Luteal Phase (Days 15-28)
                  </h4>
                  <p className="text-sm">
                    After ovulation, the body prepares for possible pregnancy.
                    If the egg isn't fertilized, hormone levels drop, leading to
                    PMS symptoms like bloating, breast tenderness, mood swings,
                    and fatigue before the cycle begins again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
