import React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { pt } from "date-fns/locale"

interface DatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DatePicker({ 
  className, 
  value, 
  onChange, 
  placeholder = "Selecione uma data" 
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value)

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (onChange) {
      onChange(selectedDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: pt }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          locale={pt}
        />
      </PopoverContent>
    </Popover>
  )
} 