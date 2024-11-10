export enum CompanySector {
    TECHNOLOGY = "Tecnologia",
    FINANCIAL = "Financeiro",
    HEALTHCARE = "Saúde",
    CONSUMER = "Consumo",
    INDUSTRIAL = "Industrial",
    UTILITIES = "Utilidades Públicas",
    REAL_ESTATE = "Imobiliário",
    ENERGY = "Energia",
    MATERIALS = "Materiais",
    TELECOM = "Telecomunicações",
    MINING = "Mineração",
    AGRIBUSINESS = "Agronegócio",
    RETAIL = "Varejo",
    TRANSPORTATION = "Transportes",
    PULP_AND_PAPER = "Papel e Celulose"
}

export interface SectorMetrics {
    maxPE: number;
    maxPBV: number;
    minDividendYield: number;
    minProfitMargin: number;
    minROE: number;
    maxDebtToEquity: number;
}

export const sectorMetrics: Record<CompanySector, SectorMetrics> = {
    [CompanySector.TECHNOLOGY]: {
        maxPE: 40,
        maxPBV: 5,
        minDividendYield: 1,
        minProfitMargin: 15,
        minROE: 15,
        maxDebtToEquity: 0.5
    },
    [CompanySector.FINANCIAL]: {
        maxPE: 15,
        maxPBV: 2,
        minDividendYield: 4,
        minProfitMargin: 20,
        minROE: 15,
        maxDebtToEquity: 2.0
    },
    [CompanySector.HEALTHCARE]: {
        maxPE: 25,
        maxPBV: 4,
        minDividendYield: 2,
        minProfitMargin: 12,
        minROE: 12,
        maxDebtToEquity: 0.8
    },
    [CompanySector.CONSUMER]: {
        maxPE: 20,
        maxPBV: 3,
        minDividendYield: 2.5,
        minProfitMargin: 8,
        minROE: 12,
        maxDebtToEquity: 1.0
    },
    [CompanySector.INDUSTRIAL]: {
        maxPE: 18,
        maxPBV: 2.5,
        minDividendYield: 3,
        minProfitMargin: 10,
        minROE: 12,
        maxDebtToEquity: 1.2
    },
    [CompanySector.UTILITIES]: {
        maxPE: 15,
        maxPBV: 2,
        minDividendYield: 5,
        minProfitMargin: 15,
        minROE: 10,
        maxDebtToEquity: 1.5
    },
    [CompanySector.REAL_ESTATE]: {
        maxPE: 16,
        maxPBV: 1.5,
        minDividendYield: 5,
        minProfitMargin: 25,
        minROE: 8,
        maxDebtToEquity: 2.0
    },
    [CompanySector.ENERGY]: {
        maxPE: 12,
        maxPBV: 1.8,
        minDividendYield: 4,
        minProfitMargin: 12,
        minROE: 10,
        maxDebtToEquity: 1.3
    },
    [CompanySector.MATERIALS]: {
        maxPE: 14,
        maxPBV: 2,
        minDividendYield: 3,
        minProfitMargin: 10,
        minROE: 12,
        maxDebtToEquity: 1.0
    },
    [CompanySector.TELECOM]: {
        maxPE: 16,
        maxPBV: 2.2,
        minDividendYield: 4,
        minProfitMargin: 12,
        minROE: 12,
        maxDebtToEquity: 1.4
    },
    [CompanySector.MINING]: {
        maxPE: 12,
        maxPBV: 2,
        minDividendYield: 4,
        minProfitMargin: 15,
        minROE: 12,
        maxDebtToEquity: 1.2
    },
    [CompanySector.AGRIBUSINESS]: {
        maxPE: 15,
        maxPBV: 2.5,
        minDividendYield: 2.5,
        minProfitMargin: 8,
        minROE: 10,
        maxDebtToEquity: 1.5
    },
    [CompanySector.RETAIL]: {
        maxPE: 20,
        maxPBV: 3,
        minDividendYield: 2,
        minProfitMargin: 5,
        minROE: 12,
        maxDebtToEquity: 1.0
    },
    [CompanySector.TRANSPORTATION]: {
        maxPE: 16,
        maxPBV: 2.2,
        minDividendYield: 3,
        minProfitMargin: 8,
        minROE: 10,
        maxDebtToEquity: 1.8
    },
    [CompanySector.PULP_AND_PAPER]: {
        maxPE: 14,
        maxPBV: 2,
        minDividendYield: 3.5,
        minProfitMargin: 12,
        minROE: 10,
        maxDebtToEquity: 1.3
    }
}; 