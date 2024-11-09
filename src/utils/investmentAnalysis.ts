import { StockIndicators } from "../types/indicators";

interface ScoreWeights {
    [key: string]: number;
}

const weights: ScoreWeights = {
    pe: 15,
    pbv: 15,
    dividendYield: 10,
    revenueGrowth: 10,
    profitGrowth: 15,
    profitMargin: 10,
    roe: 15,
    debtToEquity: 10
};

export function calculateInvestmentScore(indicators: StockIndicators) {
    const scores = {
        pe: calculatePEScore(indicators.pe),
        pbv: calculatePBVScore(indicators.pbv),
        dividendYield: calculateDYScore(indicators.dividendYield),
        revenueGrowth: calculateGrowthScore(indicators.revenueGrowth),
        profitGrowth: calculateGrowthScore(indicators.profitGrowth),
        profitMargin: calculateMarginScore(indicators.profitMargin),
        roe: calculateROEScore(indicators.roe),
        debtToEquity: calculateDebtScore(indicators.debtToEquity)
    };

    const finalScore = Object.entries(scores).reduce((total, [metric, score]) => {
        return total + (score * weights[metric]) / 100;
    }, 0);

    return { scores, finalScore };
}

// Ajustes nas faixas de cálculo
function calculatePEScore(pe: number): number {
    if (pe <= 0) return 0;
    if (pe <= 10) return 100;
    if (pe <= 20) return 80;
    if (pe <= 30) return 60;
    return 0;
}

function calculatePBVScore(pbv: number): number {
    if (pbv <= 0) return 0;
    if (pbv <= 1) return 100;
    if (pbv <= 2) return 80;
    if (pbv <= 3) return 60;
    if (pbv <= 4) return 40;
    return 0;
}

function calculateDYScore(dy: number): number {
    if (dy <= 0) return 0;
    if (dy >= 6) return 100;
    if (dy >= 4) return 80;
    if (dy >= 2) return 60;
    return 0;
}

function calculateGrowthScore(growth: number): number {
    if (growth <= 0) return 0;
    if (growth >= 25) return 100;
    if (growth >= 20) return 80;
    if (growth >= 15) return 60;
    if (growth >= 10) return 40;
    if (growth >= 5) return 20;
    return 0;
}

function calculateMarginScore(margin: number): number {
    if (margin <= 0) return 0;
    if (margin >= 30) return 100;
    if (margin >= 25) return 80;
    if (margin >= 20) return 60;
    if (margin >= 15) return 40;
    if (margin >= 10) return 20;
    return 0;
}

function calculateROEScore(roe: number): number {
    if (roe <= 0) return 0;
    if (roe >= 25) return 100;
    if (roe >= 20) return 80;
    if (roe >= 15) return 60;
    if (roe >= 10) return 40;
    if (roe >= 5) return 20;
    return 0;
}

function calculateDebtScore(debtToEquity: number): number {
    if (debtToEquity <= 0.3) return 100;
    if (debtToEquity <= 0.5) return 80;
    if (debtToEquity <= 0.8) return 60;
    if (debtToEquity <= 1.0) return 40;
    return 0;
}