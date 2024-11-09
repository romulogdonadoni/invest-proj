import { Indicators } from "../types/indicators";

interface ProjectionData {
    revenues: number[];
    profits: number[];
    dividends: number[];
}

export function calculateProjections(indicators: Indicators, type: 'monthly' | 'yearly'): ProjectionData {
    if (type === 'yearly') {
        return calculateYearlyProjections(indicators);
    } else {
        return calculateMonthlyProjections(indicators);
    }
}

function calculateYearlyProjections(indicators: Indicators): ProjectionData {
    const years = 5;
    const revenues: number[] = [];
    const profits: number[] = [];
    const dividends: number[] = [];

    // Usando VPA (Book Value per Share) como base para receita inicial
    let currentProfit = indicators.eps;
    // Melhor estimativa de receita usando margem EBITDA
    let currentRevenue = currentProfit / (indicators.ebitdaMargin / 100);

    for (let i = 0; i < years; i++) {
        // Crescimento anual considerando ROE
        const growthMultiplier = Math.min(indicators.roe / 100, indicators.profitCAGR / 100);
        currentRevenue *= (1 + indicators.revenueCAGR / 100);
        currentProfit *= (1 + growthMultiplier);
        
        // Usando histórico de dividendos para melhor projeção
        const dividendRate = Math.max(indicators.dividendYield, indicators.avgDividendYield5y) / 100;
        const dividend = currentProfit * dividendRate;

        revenues.push(Number(currentRevenue.toFixed(2)));
        profits.push(Number(currentProfit.toFixed(2)));
        dividends.push(Number(dividend.toFixed(2)));
    }

    return { revenues, profits, dividends };
}

function calculateMonthlyProjections(indicators: Indicators): ProjectionData {
    const months = 24;
    const revenues: number[] = [];
    const profits: number[] = [];
    const dividends: number[] = [];

    // Convertendo taxas anuais para mensais
    const monthlyRevenueGrowth = Math.pow(1 + indicators.revenueCAGR / 100, 1/12) - 1;
    const monthlyProfitGrowth = Math.pow(1 + indicators.profitCAGR / 100, 1/12) - 1;

    let currentProfit = indicators.eps / 12; // Dividindo o LPA anual por 12
    let currentRevenue = currentProfit / (indicators.pe / 100);

    for (let i = 0; i < months; i++) {
        currentRevenue *= (1 + monthlyRevenueGrowth);
        currentProfit *= (1 + monthlyProfitGrowth);
        const dividend = currentProfit * (indicators.dividendYield / 100);

        revenues.push(Number(currentRevenue.toFixed(2)));
        profits.push(Number(currentProfit.toFixed(2)));
        dividends.push(Number(dividend.toFixed(2)));
    }

    return { revenues, profits, dividends };
}

export function generateLabels(type: 'monthly' | 'yearly') {
    const labels: string[] = [];
    const periods = type === 'monthly' ? 24 : 5;
    
    if (type === 'monthly') {
        // Gera labels para os próximos 24 meses
        const months = [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];
        
        const currentMonth = new Date().getMonth();
        
        for (let i = 0; i < periods; i++) {
            const monthIndex = (currentMonth + i) % 12;
            const yearOffset = Math.floor((currentMonth + i) / 12);
            const year = new Date().getFullYear() + yearOffset;
            labels.push(`${months[monthIndex]}/${year}`);
        }
    } else {
        // Gera labels para os próximos 5 anos
        const currentYear = new Date().getFullYear();
        
        for (let i = 0; i <= periods; i++) {
            labels.push((currentYear + i).toString());
        }
    }
    
    return labels;
} 