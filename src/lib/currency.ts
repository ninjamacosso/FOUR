/**
 * Format a number as Angolan Kwanza (AOA)
 * @param amount - The amount to format
 * @returns Formatted string with AOA currency symbol
 */
export const formatKwanza = (amount: number): string => {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Parse a formatted Kwanza string back to a number
 * @param formattedAmount - The formatted amount string
 * @returns The numeric value
 */
export const parseKwanza = (formattedAmount: string): number => {
  // Remove currency symbol, spaces, and replace comma with dot
  const cleanedString = formattedAmount
    .replace(/[^0-9,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return parseFloat(cleanedString);
};

/**
 * Calculate tax amount based on a percentage
 * @param amount - The base amount
 * @param percentage - The tax percentage
 * @returns The calculated tax amount
 */
export const calculateTax = (amount: number, percentage: number): number => {
  return amount * (percentage / 100);
};

/**
 * Format a percentage value
 * @param value - The percentage value (e.g., 17.5)
 * @returns Formatted percentage string (e.g., "17,5%")
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat("pt-AO", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
};
