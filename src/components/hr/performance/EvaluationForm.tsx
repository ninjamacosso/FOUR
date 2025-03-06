import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, X } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  employeeId: z.string().min(1, { message: "Employee ID is required" }),
  evaluationPeriod: z
    .string()
    .min(1, { message: "Evaluation period is required" }),
  jobPerformance: z.number().min(1).max(5),
  workQuality: z.number().min(1).max(5),
  teamwork: z.number().min(1).max(5),
  communication: z.number().min(1).max(5),
  initiative: z.number().min(1).max(5),
  adaptability: z.number().min(1).max(5),
  overallRating: z.enum([
    "excellent",
    "good",
    "satisfactory",
    "needsImprovement",
    "unsatisfactory",
  ]),
  strengths: z
    .string()
    .min(10, { message: "Please provide at least 10 characters" }),
  areasForImprovement: z
    .string()
    .min(10, { message: "Please provide at least 10 characters" }),
  developmentPlan: z
    .string()
    .min(10, { message: "Please provide at least 10 characters" }),
  evaluatorComments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EvaluationFormProps {
  employeeId?: string;
  evaluationPeriod?: string;
  onSubmit?: (data: FormValues) => void;
  onCancel?: () => void;
}

const EvaluationForm = ({
  employeeId = "EMP001",
  evaluationPeriod = "January 2023 - June 2023",
  onSubmit = () => {},
  onCancel = () => {},
}: EvaluationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId,
      evaluationPeriod,
      jobPerformance: 3,
      workQuality: 3,
      teamwork: 3,
      communication: 3,
      initiative: 3,
      adaptability: 3,
      overallRating: "satisfactory",
      strengths: "",
      areasForImprovement: "",
      developmentPlan: "",
      evaluatorComments: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Performance Evaluation Form</CardTitle>
        <CardDescription>
          Complete the evaluation form for the employee's performance review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EMP001">
                            EMP001 - John Doe
                          </SelectItem>
                          <SelectItem value="EMP002">
                            EMP002 - Jane Smith
                          </SelectItem>
                          <SelectItem value="EMP003">
                            EMP003 - Carlos Santos
                          </SelectItem>
                          <SelectItem value="EMP004">
                            EMP004 - Maria Gomes
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="evaluationPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Evaluation Period</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="January 2023 - June 2023">
                            January 2023 - June 2023
                          </SelectItem>
                          <SelectItem value="July 2023 - December 2023">
                            July 2023 - December 2023
                          </SelectItem>
                          <SelectItem value="January 2024 - June 2024">
                            January 2024 - June 2024
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Performance Criteria</h3>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="jobPerformance"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Job Performance</FormLabel>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            Poor
                          </span>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            Excellent
                          </span>
                        </div>
                        <FormDescription>
                          Current rating: {value}/5
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workQuality"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Work Quality</FormLabel>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            Poor
                          </span>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            Excellent
                          </span>
                        </div>
                        <FormDescription>
                          Current rating: {value}/5
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teamwork"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Teamwork</FormLabel>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            Poor
                          </span>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            Excellent
                          </span>
                        </div>
                        <FormDescription>
                          Current rating: {value}/5
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communication"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Communication</FormLabel>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            Poor
                          </span>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            Excellent
                          </span>
                        </div>
                        <FormDescription>
                          Current rating: {value}/5
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="initiative"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Initiative</FormLabel>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            Poor
                          </span>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            Excellent
                          </span>
                        </div>
                        <FormDescription>
                          Current rating: {value}/5
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adaptability"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Adaptability</FormLabel>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            Poor
                          </span>
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground">
                            Excellent
                          </span>
                        </div>
                        <FormDescription>
                          Current rating: {value}/5
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="overallRating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Overall Performance Rating</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="excellent" id="excellent" />
                        <FormLabel
                          htmlFor="excellent"
                          className="font-normal cursor-pointer"
                        >
                          Excellent - Consistently exceeds expectations
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="good" id="good" />
                        <FormLabel
                          htmlFor="good"
                          className="font-normal cursor-pointer"
                        >
                          Good - Often exceeds expectations
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="satisfactory"
                          id="satisfactory"
                        />
                        <FormLabel
                          htmlFor="satisfactory"
                          className="font-normal cursor-pointer"
                        >
                          Satisfactory - Meets expectations
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="needsImprovement"
                          id="needsImprovement"
                        />
                        <FormLabel
                          htmlFor="needsImprovement"
                          className="font-normal cursor-pointer"
                        >
                          Needs Improvement - Sometimes falls short of
                          expectations
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="unsatisfactory"
                          id="unsatisfactory"
                        />
                        <FormLabel
                          htmlFor="unsatisfactory"
                          className="font-normal cursor-pointer"
                        >
                          Unsatisfactory - Consistently falls short of
                          expectations
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="strengths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Strengths</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the employee's key strengths and accomplishments"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="areasForImprovement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Areas for Improvement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Identify areas where the employee can improve"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="developmentPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Development Plan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Outline specific actions for professional development"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="evaluatorComments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional comments or observations"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-between px-0">
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Evaluation
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EvaluationForm;
