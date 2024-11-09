interface Indicators {
  roe: number;
  dividendYield: number;
  pe: number;
  ebitdaMargin: number;
  revenueCAGR: number;
  profitCAGR: number;
}

export function calculateInvestmentScore(indicators: Indicators) {
  // Pesos para cada indicador (total = 1)
  const weights = {
    roe: 0.20,
    dividendYield: 0.15,
    pe: 0.15,
    ebitdaMargin: 0.15,
    revenueCAGR: 0.15,
    profitCAGR: 0.20
  };

  // Normalização dos valores (escala 0-100)
  const scores = {
    roe: Math.min(indicators.roe * 4, 100), // ROE de 25% = 100 pontos
    dividendYield: Math.min(indicators.dividendYield * 10, 100), // DY de 10% = 100 pontos
    pe: Math.max(0, 100 - (indicators.pe * 5)), // P/L menor é melhor (P/L de 20 = 0 pontos)
    ebitdaMargin: Math.min(indicators.ebitdaMargin * 2.5, 100), // Margem de 40% = 100 pontos
    revenueCAGR: Math.min(Math.max(indicators.revenueCAGR * 5, 0), 100), // CAGR de 20% = 100 pontos
    profitCAGR: Math.min(Math.max(indicators.profitCAGR * 5, 0), 100)
  };

  // Cálculo do score final ponderado
  const finalScore = Object.entries(weights).reduce((total, [key, weight]) => {
    return total + (scores[key as keyof typeof scores] * weight);
  }, 0);

  return { scores, finalScore };
}
