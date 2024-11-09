import { createContext, useContext, useState, ReactNode } from 'react';
import { Indicators } from '../types/indicators';

// Valores iniciais
const initialIndicators: Indicators = {
    currentPrice: 0,
    pe: 0,
    eps: 0,
    revenueCAGR: 0,
    profitCAGR: 0,
    dividendYield: 0,
    roe: 0,
    ebitdaMargin: 0,
    dividendPerShare: 0,
    avgDividendYield5y: 0,
    bvps: 0,
    vpa: 0
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