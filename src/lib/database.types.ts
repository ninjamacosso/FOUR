export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string;
          created_at: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          position: string;
          department: string;
          status: string;
          join_date: string;
          address: string | null;
          national_id: string | null;
          tax_id: string | null;
          social_security_number: string | null;
          bank_account: string | null;
          emergency_contact_name: string | null;
          emergency_contact_relationship: string | null;
          emergency_contact_phone: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          position: string;
          department: string;
          status: string;
          join_date: string;
          address?: string | null;
          national_id?: string | null;
          tax_id?: string | null;
          social_security_number?: string | null;
          bank_account?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_relationship?: string | null;
          emergency_contact_phone?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          position?: string;
          department?: string;
          status?: string;
          join_date?: string;
          address?: string | null;
          national_id?: string | null;
          tax_id?: string | null;
          social_security_number?: string | null;
          bank_account?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_relationship?: string | null;
          emergency_contact_phone?: string | null;
          avatar_url?: string | null;
        };
        Relationships: [];
      };
      contracts: {
        Row: {
          id: string;
          created_at: string;
          employee_id: string;
          type: string;
          start_date: string;
          end_date: string | null;
          salary: number;
          status: string;
          document_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          employee_id: string;
          type: string;
          start_date: string;
          end_date?: string | null;
          salary: number;
          status: string;
          document_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          employee_id?: string;
          type?: string;
          start_date?: string;
          end_date?: string | null;
          salary?: number;
          status?: string;
          document_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "contracts_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
        ];
      };
      documents: {
        Row: {
          id: string;
          created_at: string;
          employee_id: string;
          name: string;
          type: string;
          url: string;
          size: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          employee_id: string;
          name: string;
          type: string;
          url: string;
          size: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          employee_id?: string;
          name?: string;
          type?: string;
          url?: string;
          size?: number;
        };
        Relationships: [
          {
            foreignKeyName: "documents_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
        ];
      };
      leave_requests: {
        Row: {
          id: string;
          created_at: string;
          employee_id: string;
          leave_type: string;
          start_date: string;
          end_date: string;
          reason: string | null;
          status: string;
          approved_by: string | null;
          approved_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          employee_id: string;
          leave_type: string;
          start_date: string;
          end_date: string;
          reason?: string | null;
          status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          employee_id?: string;
          leave_type?: string;
          start_date?: string;
          end_date?: string;
          reason?: string | null;
          status?: string;
          approved_by?: string | null;
          approved_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "leave_requests_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
        ];
      };
      payroll_periods: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          start_date: string;
          end_date: string;
          status: string;
          processed_by: string | null;
          processed_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          start_date: string;
          end_date: string;
          status?: string;
          processed_by?: string | null;
          processed_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          start_date?: string;
          end_date?: string;
          status?: string;
          processed_by?: string | null;
          processed_at?: string | null;
        };
        Relationships: [];
      };
      payroll_items: {
        Row: {
          id: string;
          created_at: string;
          payroll_period_id: string;
          employee_id: string;
          base_salary: number;
          allowances: number;
          overtime_hours: number;
          overtime_rate: number;
          income_tax: number;
          social_security: number;
          other_deductions: number;
          net_salary: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          payroll_period_id: string;
          employee_id: string;
          base_salary: number;
          allowances: number;
          overtime_hours: number;
          overtime_rate: number;
          income_tax: number;
          social_security: number;
          other_deductions: number;
          net_salary: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          payroll_period_id?: string;
          employee_id?: string;
          base_salary?: number;
          allowances?: number;
          overtime_hours?: number;
          overtime_rate?: number;
          income_tax?: number;
          social_security?: number;
          other_deductions?: number;
          net_salary?: number;
        };
        Relationships: [
          {
            foreignKeyName: "payroll_items_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payroll_items_payroll_period_id_fkey";
            columns: ["payroll_period_id"];
            referencedRelation: "payroll_periods";
            referencedColumns: ["id"];
          },
        ];
      };
      performance_evaluations: {
        Row: {
          id: string;
          created_at: string;
          employee_id: string;
          period: string;
          overall_rating: string;
          review_date: string;
          reviewed_by: string;
          comments: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          employee_id: string;
          period: string;
          overall_rating: string;
          review_date: string;
          reviewed_by: string;
          comments?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          employee_id?: string;
          period?: string;
          overall_rating?: string;
          review_date?: string;
          reviewed_by?: string;
          comments?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "performance_evaluations_employee_id_fkey";
            columns: ["employee_id"];
            referencedRelation: "employees";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
