import Navbar from "@/components/Navbar";
import { getHealthAdviceCategories } from "@/lib/cycleCalculations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Dynamic import of icons based on string
import * as LucideIcons from "lucide-react";

const DynamicIcon = ({ name }: { name: string }) => {
  // @ts-ignore - dynamic icon import
  const IconComponent = LucideIcons[name] || LucideIcons.Circle;
  return <IconComponent size={20} />;
};

const HealthPage = () => {
  const categories = getHealthAdviceCategories();

  const periodAdvice = [
    {
      title: "Managing Period Pain",
      content:
        "Apply a heating pad to your lower abdomen or back, take warm baths, and consider over-the-counter pain relievers like ibuprofen. Gentle exercises such as walking or yoga can also help relieve cramps.",
      important: true,
    },
    {
      title: "Staying Hydrated",
      content:
        "Drinking plenty of water can reduce bloating and alleviate cramps. Aim for at least 8 glasses per day during your period.",
    },
    {
      title: "Foods to Embrace",
      content:
        "Focus on anti-inflammatory foods like leafy greens, fatty fish, nuts, and fruits. Foods rich in iron help replenish what's lost during menstruation.",
    },
    {
      title: "Foods to Limit",
      content:
        "Reduce salt, sugar, alcohol, and caffeine, which can worsen bloating, breast tenderness, and mood swings.",
    },
    {
      title: "Rest and Self-Care",
      content:
        "Listen to your body and rest when needed. Prioritize sleep and engage in activities that help you relax, such as reading, meditating, or taking a warm bath.",
    },
  ];

  const fertilityAdvice = [
    {
      title: "Understanding Ovulation",
      content:
        "Ovulation typically occurs around the middle of your cycle. Signs include changes in cervical mucus (becomes clearer and more slippery), a slight rise in basal body temperature, and sometimes mild pain on one side of the abdomen.",
      important: true,
    },
    {
      title: "Tracking Your Fertile Window",
      content:
        "Your fertile window includes the 5 days before ovulation and the day of ovulation. Sperm can survive up to 5 days in the female reproductive tract, while an egg lives for about 24 hours after ovulation.",
    },
    {
      title: "Optimizing Fertility",
      content:
        "Maintain a healthy weight, eat a balanced diet, exercise regularly, manage stress, and avoid smoking and excessive alcohol consumption.",
    },
    {
      title: "Cervical Mucus Changes",
      content:
        "As you approach ovulation, cervical mucus becomes clearer, more slippery, and stretchy (similar to egg whites). This creates an environment that helps sperm travel to the egg.",
    },
    {
      title: "When to Seek Help",
      content:
        "If you've been trying to conceive for over a year (or 6 months if you're over 35) without success, consider consulting a fertility specialist.",
    },
  ];

  const pregnancyAdvice = [
    {
      title: "Early Pregnancy Signs",
      content:
        "Besides a missed period, early signs may include fatigue, breast tenderness, nausea, frequent urination, and mood changes. Take a pregnancy test if you suspect you're pregnant.",
      important: true,
    },
    {
      title: "Prenatal Care",
      content:
        "Schedule your first prenatal visit as soon as you confirm your pregnancy. Regular check-ups help monitor your health and your baby's development.",
    },
    {
      title: "Nutrition During Pregnancy",
      content:
        "Focus on a diet rich in fruits, vegetables, lean proteins, whole grains, and dairy. Take prenatal vitamins with folic acid, which is crucial for preventing neural tube defects.",
    },
    {
      title: "Safe Exercise",
      content:
        "Regular, moderate exercise is beneficial during pregnancy. Good options include walking, swimming, and prenatal yoga. Always consult your healthcare provider before starting any exercise program.",
    },
    {
      title: "Things to Avoid",
      content:
        "Avoid alcohol, tobacco, excessive caffeine, and certain foods like raw seafood, unpasteurized dairy, and deli meats. Check with your healthcare provider about medications that are safe during pregnancy.",
    },
  ];

  const lifestyleAdvice = [
    {
      title: "Regular Exercise",
      content:
        "Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week. Regular exercise can help regulate hormones and reduce PMS symptoms.",
      important: true,
    },
    {
      title: "Stress Management",
      content:
        "Chronic stress can disrupt hormone balance and affect your cycle. Practice stress-reduction techniques like meditation, deep breathing, or yoga.",
    },
    {
      title: "Sleep Quality",
      content:
        "Aim for 7-9 hours of quality sleep per night. Good sleep habits help regulate hormones and support overall reproductive health.",
    },
    {
      title: "Balanced Diet",
      content:
        "Eat a diet rich in whole foods, including plenty of fruits, vegetables, lean proteins, healthy fats, and whole grains. Limit processed foods, excessive sugar, and alcohol.",
    },
    {
      title: "Regular Health Check-ups",
      content:
        "Schedule regular gynecological check-ups, including Pap smears and breast examinations, as recommended by your healthcare provider.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="pt-6 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight mb-4 animate-fade-in">
            Health & Wellness
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Expert advice and resources for all stages of your reproductive
            health journey.
          </p>
        </div>

        {/* Search bar */}
        {/* <div className="mb-8 animate-fade-in">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search health topics..."
              className="pl-10 pr-4 py-2 rounded-full border-primary/20 focus-visible:ring-primary"
            />
          </div>
        </div> */}

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={cn(
                "rounded-xl p-5 transition-all hover:scale-[1.02] shadow-sm animate-fade-in",
                category.color
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-3">
                <div className="mr-3 p-2 bg-white/30 rounded-lg">
                  <DynamicIcon name={category.icon} />
                </div>
                <h3 className="font-medium">{category.title}</h3>
              </div>
              <p className="text-sm mb-4">{category.description}</p>
              <a
                href="https://www.nhs.uk/conditions/periods/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="bg-white/70 hover:bg-white"
                >
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Tabbed content */}
        <div className="glass-card animate-fade-in">
          <Tabs defaultValue="period" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="period">Period Health</TabsTrigger>
              <TabsTrigger value="fertility">Fertility</TabsTrigger>
              <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            </TabsList>

            <TabsContent value="period" className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4">Period Health</h2>
              <div className="space-y-4">
                {periodAdvice.map((advice, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      advice.important
                        ? "border-app-blush bg-app-blush/10"
                        : "border-muted bg-muted/30"
                    )}
                  >
                    <h3 className="font-medium mb-2">{advice.title}</h3>
                    <p className="text-sm">{advice.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fertility" className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4">
                Fertility & Ovulation
              </h2>
              <div className="space-y-4">
                {fertilityAdvice.map((advice, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      advice.important
                        ? "border-app-teal bg-app-teal/10"
                        : "border-muted bg-muted/30"
                    )}
                  >
                    <h3 className="font-medium mb-2">{advice.title}</h3>
                    <p className="text-sm">{advice.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pregnancy" className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4">Pregnancy Health</h2>
              <div className="space-y-4">
                {pregnancyAdvice.map((advice, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      advice.important
                        ? "border-app-peach bg-app-peach/10"
                        : "border-muted bg-muted/30"
                    )}
                  >
                    <h3 className="font-medium mb-2">{advice.title}</h3>
                    <p className="text-sm">{advice.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lifestyle" className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4">
                Lifestyle & Wellness
              </h2>
              <div className="space-y-4">
                {lifestyleAdvice.map((advice, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      advice.important
                        ? "border-app-lavender bg-app-lavender/10"
                        : "border-muted bg-muted/30"
                    )}
                  >
                    <h3 className="font-medium mb-2">{advice.title}</h3>
                    <p className="text-sm">{advice.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default HealthPage;
