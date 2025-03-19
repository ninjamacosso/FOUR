declare module '@/components/ui/date-picker' {
  import React from 'react';

  export interface DatePickerProps {
    className?: string;
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
  }

  export const DatePicker: React.FC<DatePickerProps>;
} 