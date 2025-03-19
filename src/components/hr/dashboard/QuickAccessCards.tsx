import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  CalendarDays,
  BadgeDollarSign,
  Award,
  FileBarChart,
  FileText,
  UserPlus,
  Clock,
  Briefcase,
  ArrowRight,
} from "lucide-react";

interface QuickAccessCard {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
}

interface QuickAccessCardsProps {
  cards: QuickAccessCard[];
  onCardClick?: (link: string) => void;
}

const QuickAccessCards: React.FC<QuickAccessCardsProps> = ({ cards = [], onCardClick }) => {
  const handleClick = (link: string) => {
    if (onCardClick) {
      onCardClick(link);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className="overflow-hidden group cursor-pointer" 
          onClick={() => handleClick(card.link)}
        >
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="p-3 rounded-lg bg-primary/10 inline-block text-primary">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {card.description}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start p-0 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(card.link);
                }}
              >
                <span>Acessar</span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickAccessCards;
