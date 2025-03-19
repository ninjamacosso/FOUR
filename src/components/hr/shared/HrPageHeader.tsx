import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, HelpCircle } from 'lucide-react';

interface HrPageHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
}

export const HrPageHeader: React.FC<HrPageHeaderProps> = ({
  title,
  description,
  icon,
  onSettingsClick,
  onHelpClick,
}) => {
  return (
    <div className="flex items-center justify-between pb-4 border-b">
      <div className="flex items-center space-x-4">
        {icon && <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        {onHelpClick && (
          <Button variant="outline" size="icon" onClick={onHelpClick}>
            <HelpCircle className="h-4 w-4" />
          </Button>
        )}
        {onSettingsClick && (
          <Button variant="outline" size="icon" onClick={onSettingsClick}>
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HrPageHeader; 