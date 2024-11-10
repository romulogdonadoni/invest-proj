export interface Indicators {
    currentPrice: number;
    pe: number;
    eps: number;
    revenueCAGR: number;
    profitCAGR: number;
    dividendYield: number;
    roe: number;
    ebitdaMargin: number;
    dividendPerShare: number;
    avgDividendYield5y: number;
    bvps: number;
    vpa: number;
    priceVariation: number;
    pbv: number;
} 

export interface StockIndicators {
    price: number;
    priceVariation12m: number;
    pe: number;
    pbv: number;
    dividendYield: number;
    profitMargin: number;
    roe: number;
    debtToEquity: number;
} 