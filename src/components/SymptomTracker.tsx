
import { useState } from 'react';
import { getSymptomOptions } from '@/lib/cycleCalculations';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const SymptomTracker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("physical");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();
  
  const symptomOptions = getSymptomOptions();
  
  const categories = [
    { id: "physical", label: "Physical" },
    { id: "emotional", label: "Emotional" },
    { id: "flow", label: "Flow" }
  ];
  
  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };
  
  const filteredSymptoms = symptomOptions.filter(
    symptom => symptom.category === activeCategory
  );

  const getSymptomSuggestions = () => {
    const suggestions: { symptom: string; advice: string[] }[] = [];
    
    selectedSymptoms.forEach(symptomId => {
      const symptom = symptomOptions.find(s => s.id === symptomId);
      if (symptom) {
        let advice: string[] = [];
        
        // Specific advice based on symptom
        switch (symptomId) {
          case "cramps":
            advice = [
              "Apply a heating pad to your lower abdomen",
              "Take over-the-counter pain relievers like ibuprofen",
              "Stay hydrated and avoid caffeine",
              "Try gentle stretching or yoga poses"
            ];
            break;
          case "headache":
            advice = [
              "Rest in a quiet, dark room",
              "Apply a cold or warm compress to your head",
              "Stay hydrated and avoid triggers like bright lights",
              "Practice relaxation techniques or gentle massage"
            ];
            break;
          case "backache":
            advice = [
              "Apply a heating pad to the affected area",
              "Practice gentle stretching exercises",
              "Take warm baths with Epsom salts",
              "Consider over-the-counter pain relievers if needed"
            ];
            break;
          case "fatigue":
            advice = [
              "Prioritize getting 7-9 hours of sleep",
              "Take short power naps during the day",
              "Stay hydrated and eat iron-rich foods",
              "Gentle exercise like walking can boost energy"
            ];
            break;
          case "bloating":
            advice = [
              "Reduce salt intake to prevent water retention",
              "Eat smaller, more frequent meals",
              "Avoid carbonated drinks and gas-producing foods",
              "Gentle exercise can help relieve bloating"
            ];
            break;
          case "breastTenderness":
            advice = [
              "Wear a supportive, comfortable bra",
              "Apply a cold compress to reduce discomfort",
              "Limit caffeine and salt intake",
              "Consider over-the-counter pain relievers if needed"
            ];
            break;
          case "acne":
            advice = [
              "Wash your face twice daily with a gentle cleanser",
              "Avoid touching your face and keep hair clean",
              "Use non-comedogenic skincare products",
              "Consider topical treatments with salicylic acid or benzoyl peroxide"
            ];
            break;
          case "mood_swings":
          case "anxiety":
          case "irritability":
          case "depression":
            advice = [
              "Practice mindfulness or meditation techniques",
              "Try gentle exercise like walking or yoga",
              "Prioritize self-care and rest",
              "Consider talking to a healthcare provider if symptoms are severe"
            ];
            break;
          case "stress":
            advice = [
              "Practice deep breathing exercises",
              "Try progressive muscle relaxation",
              "Take time for activities you enjoy",
              "Consider journaling or talking to a trusted friend"
            ];
            break;
          case "insomnia":
            advice = [
              "Establish a regular sleep schedule",
              "Create a relaxing bedtime routine",
              "Avoid screens before bed",
              "Keep your bedroom cool, dark, and quiet"
            ];
            break;
          case "nausea":
            advice = [
              "Eat small, frequent meals",
              "Try ginger tea or peppermint tea",
              "Avoid strong smells and greasy foods",
              "Stay hydrated with small sips of water"
            ];
            break;
          case "cravings":
            advice = [
              "Choose healthier alternatives to satisfy sweet cravings",
              "Eat regular, balanced meals to prevent hunger spikes",
              "Stay hydrated as thirst can be mistaken for hunger",
              "Allow yourself small treats in moderation"
            ];
            break;
          case "spotting":
          case "light":
          case "medium":
          case "heavy":
            advice = [
              "Use appropriate menstrual products for your flow",
              "Change products regularly to prevent leakage",
              "Track your flow to identify patterns",
              "Consult a doctor if your flow is unusually heavy or prolonged"
            ];
            break;
          default:
            advice = [
              "Rest when needed and listen to your body",
              "Stay hydrated and maintain a balanced diet",
              "Gentle exercise may help alleviate symptoms",
              "Consult with a healthcare provider for persistent symptoms"
            ];
        }
        
        suggestions.push({
          symptom: symptom.label,
          advice: advice
        });
      }
    });
    
    return suggestions;
  };
  
  const handleSave = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to track.",
        variant: "destructive",
      });
      return;
    }
    
    // Show the suggestions dialog
    setShowSuggestions(true);
    
    // Also display a toast notification
    toast({
      title: "Symptoms saved",
      description: `Successfully recorded ${selectedSymptoms.length} symptoms for today.`,
    });
  };
  
  return (
    <div className="glass-card animate-enter">
      <h3 className="text-lg font-semibold mb-3">Today's Symptoms</h3>
      
      {/* Category tabs */}
      <div className="flex space-x-2 mb-4 pb-2 border-b border-muted">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-3 py-2 rounded-lg text-sm transition-all",
              activeCategory === category.id
                ? "bg-primary text-white"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Symptom selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {filteredSymptoms.map(symptom => (
          <button
            key={symptom.id}
            onClick={() => toggleSymptom(symptom.id)}
            className={cn(
              "py-2 px-3 rounded-lg text-sm font-medium transition-all",
              selectedSymptoms.includes(symptom.id)
                ? "bg-primary/80 text-white"
                : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
            )}
          >
            {symptom.label}
          </button>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => setSelectedSymptoms([])}>
          Clear
        </Button>
        <Button size="sm" onClick={handleSave}>Save</Button>
      </div>

      {/* Suggestions Dialog */}
      <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Symptom Management Suggestions</DialogTitle>
            <DialogDescription>
              Here are some suggestions to help manage your symptoms.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {getSymptomSuggestions().map((item, index) => (
              <div key={index} className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium text-primary mb-2">{item.symptom}</h4>
                <ul className="space-y-2">
                  {item.advice.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="inline-block bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        {tipIndex + 1}
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SymptomTracker;
