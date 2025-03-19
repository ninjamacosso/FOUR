// Tipos para o módulo de Recursos Humanos

// Tipos de Funcionário
export interface Employee {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
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
}

// Tipos de Contrato
export interface Contract {
  id: string;
  created_at: string;
  employee_id: string;
  type: 'permanent' | 'temporary' | 'internship' | 'consultant';
  start_date: string;
  end_date: string | null;
  salary: number;
  status: 'active' | 'expired' | 'terminated';
  document_url: string | null;
}

// Tipos de Documento
export interface Document {
  id: string;
  created_at: string;
  employee_id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

// Tipos de Solicitação de Licença/Férias
export interface LeaveRequest {
  id: string;
  created_at: string;
  employee_id: string;
  leave_type: 'annual' | 'sick' | 'maternity' | 'paternity' | 'unpaid' | 'bereavement' | 'other';
  start_date: string;
  end_date: string;
  reason: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approved_by: string | null;
  approved_at: string | null;
}

// Tipos de Período de Folha de Pagamento
export interface PayrollPeriod {
  id: string;
  created_at: string;
  name: string;
  start_date: string;
  end_date: string;
  status: 'draft' | 'processing' | 'completed' | 'cancelled';
  processed_by: string | null;
  processed_at: string | null;
}

// Tipos de Item de Folha de Pagamento
export interface PayrollItem {
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
}

// Tipos de Avaliação de Desempenho
export interface PerformanceEvaluation {
  id: string;
  created_at: string;
  employee_id: string;
  period: string;
  overall_rating: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'poor';
  review_date: string;
  reviewed_by: string;
  comments: string | null;
}

// Tipos para Cálculos de Folha de Pagamento
export interface TaxRates {
  incomeTaxRates: {
    threshold: number;
    rate: number;
  }[];
  socialSecurityRate: number;
  employerSocialSecurityRate: number;
}

// Configurações específicas para Angola
export const angolanTaxRates: TaxRates = {
  incomeTaxRates: [
    { threshold: 70000, rate: 0 },        // Isento até 70.000 Kz
    { threshold: 100000, rate: 0.10 },    // 10% de 70.001 a 100.000 Kz
    { threshold: 150000, rate: 0.13 },    // 13% de 100.001 a 150.000 Kz
    { threshold: 200000, rate: 0.16 },    // 16% de 150.001 a 200.000 Kz
    { threshold: 300000, rate: 0.18 },    // 18% de 200.001 a 300.000 Kz
    { threshold: 500000, rate: 0.19 },    // 19% de 300.001 a 500.000 Kz
    { threshold: 1000000, rate: 0.20 },   // 20% de 500.001 a 1.000.000 Kz
    { threshold: 1500000, rate: 0.21 },   // 21% de 1.000.001 a 1.500.000 Kz
    { threshold: 2000000, rate: 0.22 },   // 22% de 1.500.001 a 2.000.000 Kz
    { threshold: 2500000, rate: 0.23 },   // 23% de 2.000.001 a 2.500.000 Kz
    { threshold: 5000000, rate: 0.24 },   // 24% de 2.500.001 a 5.000.000 Kz
    { threshold: 10000000, rate: 0.25 },  // 25% de 5.000.001 a 10.000.000 Kz
    { threshold: Infinity, rate: 0.25 },  // 25% acima de 10.000.000 Kz
  ],
  socialSecurityRate: 0.03,               // 3% para o trabalhador
  employerSocialSecurityRate: 0.08        // 8% para o empregador
};

// Tipos de Departamentos
export const departments = [
  'Administração',
  'Finanças',
  'Recursos Humanos',
  'Marketing',
  'Vendas',
  'Operações',
  'Tecnologia',
  'Logística',
  'Produção',
  'Jurídico',
  'Atendimento ao Cliente'
];

// Tipos de Cargos
export const positions = [
  'Diretor Executivo',
  'Diretor Financeiro',
  'Diretor de RH',
  'Gerente de Departamento',
  'Supervisor',
  'Analista Sênior',
  'Analista Pleno',
  'Analista Júnior',
  'Assistente',
  'Estagiário',
  'Consultor'
];

// Tipos de Benefícios
export interface Benefit {
  id: string;
  name: string;
  description: string;
  value: number;
  type: 'monetary' | 'non_monetary';
}

// Tipos de Treinamento
export interface Training {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  provider: string;
  cost: number;
}

// Tipos de Participação em Treinamento
export interface TrainingParticipation {
  id: string;
  training_id: string;
  employee_id: string;
  status: 'registered' | 'attended' | 'completed' | 'no_show';
  completion_date: string | null;
  certificate_url: string | null;
}

// Tipos de Recrutamento
export interface Recruitment {
  id: string;
  position: string;
  department: string;
  description: string;
  requirements: string;
  status: 'open' | 'in_progress' | 'closed' | 'cancelled';
  open_date: string;
  close_date: string | null;
  number_of_positions: number;
}

// Tipos de Candidato
export interface Candidate {
  id: string;
  recruitment_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  resume_url: string;
  application_date: string;
  status: 'applied' | 'screening' | 'interview' | 'technical_test' | 'offer' | 'hired' | 'rejected';
  notes: string | null;
}

// Funções de cálculo para folha de pagamento
export const calculateIncomeTax = (grossSalary: number, taxRates: TaxRates): number => {
  let remainingSalary = grossSalary;
  let totalTax = 0;
  
  for (let i = 0; i < taxRates.incomeTaxRates.length - 1; i++) {
    const currentThreshold = taxRates.incomeTaxRates[i].threshold;
    const nextThreshold = taxRates.incomeTaxRates[i + 1].threshold;
    const rate = taxRates.incomeTaxRates[i].rate;
    
    if (remainingSalary <= 0) break;
    
    if (i === 0 && remainingSalary <= currentThreshold) {
      // Isento
      break;
    } else if (i === 0) {
      // Pula a faixa isenta
      remainingSalary -= currentThreshold;
      continue;
    }
    
    const taxableAmount = Math.min(remainingSalary, nextThreshold - currentThreshold);
    totalTax += taxableAmount * rate;
    remainingSalary -= taxableAmount;
  }
  
  return totalTax;
};

export const calculateSocialSecurity = (grossSalary: number, taxRates: TaxRates): number => {
  return grossSalary * taxRates.socialSecurityRate;
};

export const calculateEmployerSocialSecurity = (grossSalary: number, taxRates: TaxRates): number => {
  return grossSalary * taxRates.employerSocialSecurityRate;
};

export const calculateNetSalary = (
  baseSalary: number, 
  allowances: number, 
  overtimeAmount: number, 
  incomeTax: number, 
  socialSecurity: number, 
  otherDeductions: number
): number => {
  const grossSalary = baseSalary + allowances + overtimeAmount;
  return grossSalary - incomeTax - socialSecurity - otherDeductions;
};

export const calculateOvertimeAmount = (
  baseSalary: number,
  overtimeHours: number,
  overtimeRate: number
): number => {
  // Considerando que o salário base é mensal e que um mês tem em média 176 horas de trabalho
  const hourlyRate = baseSalary / 176;
  return hourlyRate * overtimeHours * overtimeRate;
}; 