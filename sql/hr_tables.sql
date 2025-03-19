-- Tabela de Funcionários
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated')),
  join_date DATE NOT NULL,
  address TEXT,
  national_id TEXT,
  tax_id TEXT,
  social_security_number TEXT,
  bank_account TEXT,
  emergency_contact_name TEXT,
  emergency_contact_relationship TEXT,
  emergency_contact_phone TEXT,
  avatar_url TEXT
);

-- Tabela de Contratos
CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('permanent', 'temporary', 'internship', 'consultant')),
  start_date DATE NOT NULL,
  end_date DATE,
  salary NUMERIC(12, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'terminated')),
  document_url TEXT
);

-- Tabela de Documentos
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL
);

-- Tabela de Solicitações de Licença/Férias
CREATE TABLE IF NOT EXISTS leave_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('annual', 'sick', 'maternity', 'paternity', 'unpaid', 'bereavement', 'other')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  approved_by TEXT,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de Períodos de Folha de Pagamento
CREATE TABLE IF NOT EXISTS payroll_periods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'processing', 'completed', 'cancelled')),
  processed_by TEXT,
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de Itens de Folha de Pagamento
CREATE TABLE IF NOT EXISTS payroll_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payroll_period_id UUID NOT NULL REFERENCES payroll_periods(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  base_salary NUMERIC(12, 2) NOT NULL,
  allowances NUMERIC(12, 2) NOT NULL DEFAULT 0,
  overtime_hours NUMERIC(5, 2) NOT NULL DEFAULT 0,
  overtime_rate NUMERIC(3, 2) NOT NULL DEFAULT 1.5,
  income_tax NUMERIC(12, 2) NOT NULL DEFAULT 0,
  social_security NUMERIC(12, 2) NOT NULL DEFAULT 0,
  other_deductions NUMERIC(12, 2) NOT NULL DEFAULT 0,
  net_salary NUMERIC(12, 2) NOT NULL,
  UNIQUE (payroll_period_id, employee_id)
);

-- Tabela de Avaliações de Desempenho
CREATE TABLE IF NOT EXISTS performance_evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  period TEXT NOT NULL,
  overall_rating TEXT NOT NULL CHECK (overall_rating IN ('excellent', 'good', 'satisfactory', 'needs_improvement', 'poor')),
  review_date DATE NOT NULL,
  reviewed_by TEXT NOT NULL,
  comments TEXT
);

-- Tabela de Benefícios
CREATE TABLE IF NOT EXISTS benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  value NUMERIC(12, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('monetary', 'non_monetary'))
);

-- Tabela de Benefícios do Funcionário
CREATE TABLE IF NOT EXISTS employee_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  benefit_id UUID NOT NULL REFERENCES benefits(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  UNIQUE (employee_id, benefit_id)
);

-- Tabela de Treinamentos
CREATE TABLE IF NOT EXISTS trainings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  provider TEXT NOT NULL,
  cost NUMERIC(12, 2) NOT NULL
);

-- Tabela de Participação em Treinamentos
CREATE TABLE IF NOT EXISTS training_participations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  training_id UUID NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('registered', 'attended', 'completed', 'no_show')),
  completion_date DATE,
  certificate_url TEXT,
  UNIQUE (training_id, employee_id)
);

-- Tabela de Recrutamento
CREATE TABLE IF NOT EXISTS recruitments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'closed', 'cancelled')),
  open_date DATE NOT NULL,
  close_date DATE,
  number_of_positions INTEGER NOT NULL DEFAULT 1
);

-- Tabela de Candidatos
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recruitment_id UUID NOT NULL REFERENCES recruitments(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  application_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('applied', 'screening', 'interview', 'technical_test', 'offer', 'hired', 'rejected')),
  notes TEXT
);

-- Criar índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_contracts_employee_id ON contracts(employee_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_documents_employee_id ON documents(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);
CREATE INDEX IF NOT EXISTS idx_payroll_items_payroll_period_id ON payroll_items(payroll_period_id);
CREATE INDEX IF NOT EXISTS idx_payroll_items_employee_id ON payroll_items(employee_id);
CREATE INDEX IF NOT EXISTS idx_performance_evaluations_employee_id ON performance_evaluations(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_benefits_employee_id ON employee_benefits(employee_id);
CREATE INDEX IF NOT EXISTS idx_training_participations_employee_id ON training_participations(employee_id);
CREATE INDEX IF NOT EXISTS idx_training_participations_training_id ON training_participations(training_id);
CREATE INDEX IF NOT EXISTS idx_candidates_recruitment_id ON candidates(recruitment_id);
CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);

-- Criar políticas de segurança RLS (Row Level Security)
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Criar políticas para permitir acesso autenticado
CREATE POLICY "Permitir acesso autenticado a employees" ON employees FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a contracts" ON contracts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a documents" ON documents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a leave_requests" ON leave_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a payroll_periods" ON payroll_periods FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a payroll_items" ON payroll_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a performance_evaluations" ON performance_evaluations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a benefits" ON benefits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a employee_benefits" ON employee_benefits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a trainings" ON trainings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a training_participations" ON training_participations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a recruitments" ON recruitments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir acesso autenticado a candidates" ON candidates FOR ALL USING (auth.role() = 'authenticated'); 