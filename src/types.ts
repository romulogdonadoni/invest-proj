interface Indicators {
  profitCAGR: number;
  revenueGrowth: number;
  operatingMargin: number;
  netMargin: number;
  debtToEquity: number;
}

export interface FinancialData {
  indicators: Indicators;
} 