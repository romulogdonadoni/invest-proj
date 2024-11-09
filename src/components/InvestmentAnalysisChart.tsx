import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { calculateInvestmentScore } from '../utils/investmentAnalysis';
import { useForecast } from '../contexts/ForecastContext';


export default function InvestmentAnalysisChart() {
    const { indicators } = useForecast();
    
    const { scores, finalScore } = calculateInvestmentScore(indicators);

    const chartData = [
        { subject: 'ROE', score: scores.roe },
        { subject: 'Dividend Yield', score: scores.dividendYield },
        { subject: 'P/L', score: scores.pe },
        { subject: 'Margem EBITDA', score: scores.ebitdaMargin },
        { subject: 'CAGR Receitas', score: scores.revenueCAGR },
        { subject: 'CAGR Lucros', score: scores.profitCAGR },
    ];

    const getInvestmentRecommendation = (score: number) => {
        if (score >= 80) return 'Alto potencial (80-100%)';
        if (score >= 60) return 'Moderado-alto potencial (60-80%)';
        if (score >= 40) return 'Moderado potencial (40-60%)';
        if (score >= 20) return 'Moderado-baixo potencial (20-40%)';
        return 'Baixo potencial (0-20%)';
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow" >
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold">
                    Score de Investimento: {finalScore.toFixed(2)}/100
                </h3>
                <p className="text-gray-500">
                    {getInvestmentRecommendation(finalScore)}
                </p>
            </div>

            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer>
                    <RadarChart data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <Tooltip 
                            formatter={(value: number) => [`${value.toFixed(2)}%`, 'Score']}
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        />
                        <Radar
                            name="Score"
                            dataKey="score"
                            stroke="rgb(136, 132, 216)"
                            fill="rgba(136, 132, 216, 0.6)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 