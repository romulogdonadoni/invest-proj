interface Indicators {
  currentPrice: number;
  eps: number;
  profitCAGR: number;
  revenueGrowth: number;
  operatingMargin: number;
  netMargin: number;
  debtToEquity: number;
  roe: number;
  dividendYield: number;
  pe: number;
  ebitdaMargin: number;
  revenueCAGR: number;
}

export interface FinancialData {
  indicators: Indicators;
} 