import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateProjections } from '../utils/forecastCalculations';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useForecast } from '../contexts/ForecastContext';

export default function ForecastChart() {
    const { indicators } = useForecast();
    const [projectionType, setProjectionType] = useState<'monthly' | 'yearly'>('yearly');

    const chartData = useMemo(() => {
        const projections = calculateProjections(indicators, projectionType);
        const labels = generateLabels(projectionType);

        return labels.map((label, index) => ({
            name: label,
            receitas: projections.revenues[index],
            lucros: projections.profits[index],
            dividendos: projections.dividends[index],
        }));
    }, [indicators, projectionType]);

    return (
        <Card className="bg-white p-4 rounded-lg shadow">
            <div className="flex gap-4 justify-center mb-4">
                <Button
                    onClick={() => setProjectionType('monthly')}
                    variant={projectionType === 'monthly' ? 'default' : 'secondary'}
                >
                    Projeção Mensal
                </Button>
                <Button
                    onClick={() => setProjectionType('yearly')}
                    variant={projectionType === 'yearly' ? 'default' : 'secondary'}
                >
                    Projeção Anual
                </Button>
            </div>

            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis 
                            tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                        />
                        <Tooltip 
                            formatter={(value: number, name: string) => {
                                const labels = {
                                    receitas: 'Receitas',
                                    lucros: 'Lucros',
                                    dividendos: 'Dividendos'
                                };
                                return [`R$ ${value.toLocaleString('pt-BR')}`, labels[name as keyof typeof labels]];
                            }}
                        />
                        <Legend 
                            formatter={(value) => {
                                const descriptions = {
                                    Receitas: 'Total de receitas projetadas para o período',
                                    Lucros: 'Lucro líquido projetado após impostos e despesas',
                                    Dividendos: 'Projeção de dividendos a serem distribuídos'
                                };
                                return (
                                    <span title={descriptions[value as keyof typeof descriptions]}>
                                        {value}
                                    </span>
                                );
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="receitas"
                            stroke="#4BC0C0"
                            name="Receitas"
                        />
                        <Line
                            type="monotone"
                            dataKey="lucros"
                            stroke="#9966FF"
                            name="Lucros"
                        />
                        <Line
                            type="monotone"
                            dataKey="dividendos"
                            stroke="#FF6384"
                            name="Dividendos"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

function generateLabels(type: 'monthly' | 'yearly'): string[] {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    if (type === 'monthly') {
        const currentMonth = currentDate.getMonth(); // 0-11
        return Array.from({ length: 24 }, (_, i) => {
            const monthIndex = (currentMonth + i) % 12;
            const yearOffset = Math.floor((currentMonth + i) / 12);
            const year = currentYear + yearOffset;
            return `${year}/${String(monthIndex + 1).padStart(2, '0')}`;
        });
    }

    return Array.from({ length: 5 }, (_, i) =>
        `${currentYear + i}`
    );
} 