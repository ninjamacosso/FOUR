import PayrollProcessing from './PayrollProcessing';
import PayrollSummary from './PayrollSummary';
import PayrollEmployeeList from './PayrollEmployeeList';
import PayrollCalculation from './PayrollCalculation';
import PayrollDeductions from './PayrollDeductions';
import PayrollBenefits from './PayrollBenefits';
import PayrollHistory from './PayrollHistory';
import PayrollSettings from './PayrollSettings';
import PayrollReports from './PayrollReports';
import PayrollPayslips from './PayrollPayslips';

export {
  PayrollProcessing,
  PayrollSummary,
  PayrollEmployeeList,
  PayrollCalculation,
  PayrollDeductions,
  PayrollBenefits,
  PayrollHistory,
  PayrollSettings,
  PayrollReports,
  PayrollPayslips
};

// Formatador de moeda padrão para todo o módulo
export const formatCurrency = (value: number): string => {
  // Valor em centavos dividido por 100 para ter o valor em kwanzas
  const valueInCurrency = value / 100;
  
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valueInCurrency);
};

export default PayrollProcessing; 