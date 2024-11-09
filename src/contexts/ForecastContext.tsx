import { createContext, useContext, useState, ReactNode } from 'react';
import { Indicators } from '../types/indicators';

// Valores iniciais
const initialIndicators: Indicators = {
    currentPrice: 11.71,
    pe: 7.27,
    eps: 1.61,
    revenueCAGR: 17.01,
    profitCAGR: 10.73,
    dividendYield: 9.82,
    roe: 23.97,
    ebitdaMargin: 69.89,
    dividendPerShare: 1.15,
    avgDividendYield5y: 9.87,
    bvps: 6.73,
    vpa: 6.73,
    priceVariation: 10.23,
    pbv: 0.42
};

interface ForecastContextData {
    indicators: Indicators;
    updateIndicators: (newIndicators: Indicators) => void;
}

const ForecastContext = createContext<ForecastContextData>({} as ForecastContextData);

interface ForecastProviderProps {
    children: ReactNode;
}

export function ForecastProvider({ children }: ForecastProviderProps) {
    const [indicators, setIndicators] = useState<Indicators>(initialIndicators);

    const updateIndicators = (newIndicators: Indicators) => {
        setIndicators(newIndicators);
    };

    return (
        <ForecastContext.Provider value={{ indicators, updateIndicators }}>
            {children}
        </ForecastContext.Provider>
    );
}

// Hook personalizado para usar o contexto
export function useForecast() {
    const context = useContext(ForecastContext);
    if (!context) {
        throw new Error('useForecast deve ser usado dentro de um ForecastProvider');
    }
    return context;
} 