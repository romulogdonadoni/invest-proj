import { FinancialData } from "../types";

export const financialData: FinancialData = {
  indicators: {
    currentPrice: 0,
    eps: 0,
    profitCAGR: 15.7, // CAGR de lucro em porcentagem
    revenueGrowth: 12.3,
    operatingMargin: 23.5,
    netMargin: 18.2,
    debtToEquity: 0.45,
    roe: 18.5,
    dividendYield: 3.8,
    pe: 12.5,
    ebitdaMargin: 28.7,
    revenueCAGR: 11.2
  }
};

export const returnData = {
  nominal: {
    oneMonth: 0,
    threeMonths: 0,
    oneYear: 0,
    twoYears: 0,
    fiveYears: 0,
    tenYears: null
  },
  real: {
    oneMonth: 0,
    threeMonths: 0,
    oneYear: 0,
    twoYears: 0,
    fiveYears: 0,
    tenYears: null
  }
};

export function calculateProjectedReturns(cagr: number): number[] {
  const years = 5;
  const initialValue = 100;
  const projectedReturns = [];

  for (let year = 1; year <= years; year++) {
    const projectedValue = initialValue * Math.pow(1 + cagr / 100, year);
    projectedReturns.push(Number(projectedValue.toFixed(2)));
  }

  return projectedReturns;
} 