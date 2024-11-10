import { StockIndicators } from "../types/indicators";
import { CompanySector, sectorMetrics } from "../types/sectors";

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

export function calculateInvestmentScore(indicators: StockIndicators, sector: CompanySector) {
    const sectorWeights = adjustWeightsBySector(weights, sector);

    const scores = {
        pe: calculatePEScore(indicators.pe, sector),
        pbv: calculatePBVScore(indicators.pbv, sector),
        dividendYield: calculateDYScore(indicators.dividendYield, sector),
        profitMargin: calculateMarginScore(indicators.profitMargin, sector),
        roe: calculateROEScore(indicators.roe, sector),
        debtToEquity: calculateDebtScore(indicators.debtToEquity, sector)
    };

    const finalScore = Object.entries(scores).reduce((total, [metric, score]) => {
        return total + (score * sectorWeights[metric]) / 100;
    }, 0);

    return { scores, finalScore };
}

function adjustWeightsBySector(baseWeights: ScoreWeights, sector: CompanySector): ScoreWeights {
    const sectorWeights = { ...baseWeights };

    switch (sector) {
        case CompanySector.FINANCIAL:
            sectorWeights.debtToEquity = 5;
            sectorWeights.roe = 20;
            break;
        case CompanySector.TECHNOLOGY:
            sectorWeights.pe = 10;
            sectorWeights.profitGrowth = 20;
            break;
        case CompanySector.UTILITIES:
            sectorWeights.dividendYield = 20;
            sectorWeights.profitMargin = 15;
            break;
        // Adicione outros setores conforme necessário
    }

    // Normaliza os pesos para somarem 100
    const totalWeight = Object.values(sectorWeights).reduce((sum, weight) => sum + weight, 0);
    Object.keys(sectorWeights).forEach(key => {
        sectorWeights[key] = (sectorWeights[key] / totalWeight) * 100;
    });

    return sectorWeights;
}

function calculatePEScore(pe: number, sector: CompanySector): number {
    const maxPE = sectorMetrics[sector].maxPE;
    const sectorMultiplier = getSectorPEMultiplier(sector);

    if (pe <= 0) return 0;
    if (pe <= maxPE * 0.5 * sectorMultiplier) return 100;
    if (pe <= maxPE * 0.75 * sectorMultiplier) return 80;
    if (pe <= maxPE * sectorMultiplier) return 60;
    if (pe <= maxPE * 1.25 * sectorMultiplier) return 40;
    return 0;
}

function getSectorPEMultiplier(sector: CompanySector): number {
    switch (sector) {
        case CompanySector.TECHNOLOGY: return 1.2; // Tecnologia tende a ter P/L mais alto
        case CompanySector.UTILITIES: return 0.8; // Utilities tendem a ter P/L mais baixo
        case CompanySector.FINANCIAL: return 0.9;
        default: return 1;
    }
}

function calculatePBVScore(pbv: number, sector: CompanySector): number {
    const maxPBV = sectorMetrics[sector].maxPBV;
    if (pbv <= 0) return 0;
    if (pbv <= maxPBV * 0.5) return 100;
    if (pbv <= maxPBV * 0.75) return 80;
    if (pbv <= maxPBV) return 60;
    return 0;
}

function calculateDYScore(dy: number, sector: CompanySector): number {
    const minDY = sectorMetrics[sector].minDividendYield;
    if (dy <= 0) return 0;
    if (dy >= minDY * 2) return 100;
    if (dy >= minDY * 1.5) return 80;
    if (dy >= minDY * 1.25) return 60;
    return 0;
}

function calculateMarginScore(margin: number, sector: CompanySector): number {
    const minMargin = sectorMetrics[sector].minProfitMargin;
    if (margin <= 0) return 0;
    if (margin >= minMargin * 2) return 100;
    if (margin >= minMargin * 1.5) return 80;
    if (margin >= minMargin * 1.25) return 60;
    if (margin >= minMargin * 1.1) return 40;
    if (margin >= minMargin * 1.05) return 20;
    return 0;
}

function calculateROEScore(roe: number, sector: CompanySector): number {
    const minROE = sectorMetrics[sector].minROE;
    if (roe <= 0) return 0;
    if (roe >= minROE * 2) return 100;
    if (roe >= minROE * 1.5) return 80;
    if (roe >= minROE * 1.25) return 60;
    if (roe >= minROE * 1.1) return 40;
    if (roe >= minROE * 1.05) return 20;
    return 0;
}

function calculateDebtScore(debtToEquity: number, sector: CompanySector): number {
    const maxDebtToEquity = sectorMetrics[sector].maxDebtToEquity;
    if (debtToEquity <= 0) return 0;
    if (debtToEquity <= maxDebtToEquity * 0.5) return 100;
    if (debtToEquity <= maxDebtToEquity * 0.75) return 80;
    if (debtToEquity <= maxDebtToEquity) return 60;
    return 0;
}