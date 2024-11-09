"use client";

import { useState } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { StockIndicators } from '../types/indicators';
import { calculateInvestmentScore } from '../utils/investmentAnalysis';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';


export default function InvestmentAnalysisChart() {

    const [scores, setScores] = useState<StockIndicators>({
        price: 0,
        priceVariation12m: 0,
        pe: 0,
        pbv: 0,
        dividendYield: 0,
        revenueGrowth: 0,
        profitGrowth: 0,
        profitMargin: 0,
        roe: 0,
        debtToEquity: 0
    });

    const finalScore = calculateInvestmentScore(scores);

    const chartData = [
        { subject: 'ROE', score: scores?.roe },
        { subject: 'Dividend Yield', score: scores?.dividendYield },
        { subject: 'P/L', score: scores?.pe },
        { subject: 'P/VP', score: scores?.pbv },
        { subject: 'Crescimento Receita', score: scores?.revenueGrowth },
        { subject: 'Crescimento Lucro', score: scores?.profitGrowth },
        { subject: 'Margem de Lucro', score: scores?.profitMargin },
        { subject: 'Dívida/Patrimônio', score: scores?.debtToEquity },
    ];


    const calculateProfitMargin = (netProfit: number, netRevenue: number) => {
        if (!netRevenue || netRevenue === 0) return 0;
        return Number(((netProfit / netRevenue) * 100).toFixed(2));
    };

    return (
        <Card>
            <div className="grid grid-cols-7 gap-4 mb-4">
                <div className="grid col-span-3 gap-2">
                    <Label>Lucro Líquido</Label>
                    <Input
                        type="number"
                        value={scores.profitMargin}
                        onChange={(e) => setScores({ ...scores, profitMargin: parseFloat(e.target.value) })}
                    />
                </div>

                <div className="grid col-span-3 gap-2">
                    <Label>Receita Líquida</Label>
                    <Input
                        type="number"
                        value={scores.revenueGrowth}
                        onChange={(e) => setScores({ ...scores, revenueGrowth: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="grid col-span-1 gap-2">
                    <Label>Margem de Lucro</Label>
                    <Input
                        type="text"
                        disabled
                        value={calculateProfitMargin(scores.profitMargin, scores.revenueGrowth).toString() + "%"}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                    <Label>P/L (x)</Label>
                    <Input
                        type="number"
                        value={scores.pe}
                        onChange={(e) => setScores({ ...scores, pe: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>P/VP (x)</Label>
                    <Input
                        type="number"
                        value={scores.pbv}
                        onChange={(e) => setScores({ ...scores, pbv: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>ROE (%)</Label>
                    <Input
                        type="number"
                        value={scores.roe}
                        onChange={(e) => setScores({ ...scores, roe: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Dividend Yield (%)</Label>
                    <Input
                        type="number"
                        value={scores.dividendYield}
                        onChange={(e) => setScores({ ...scores, dividendYield: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Crescimento Receita (%)</Label>
                    <Input
                        type="number"
                        value={scores.revenueGrowth}
                        onChange={(e) => setScores({ ...scores, revenueGrowth: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Crescimento Lucro (%)</Label>
                    <Input
                        type="number"
                        value={scores.profitGrowth}
                        onChange={(e) => setScores({ ...scores, profitGrowth: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Margem de Lucro (%)</Label>
                    <Input
                        type="number"
                        value={scores.profitMargin}
                        onChange={(e) => setScores({ ...scores, profitMargin: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Dívida/Patrimônio (%)</Label>
                    <Input
                        type="number"
                        value={scores.debtToEquity}
                        onChange={(e) => setScores({ ...scores, debtToEquity: parseFloat(e.target.value) })}
                    />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold">
                        Score de Investimento: <span className={`${
                            finalScore.finalScore >= 80 ? 'text-emerald-500' :
                            finalScore.finalScore >= 60 ? 'text-green-500' :
                            finalScore.finalScore >= 40 ? 'text-yellow-500' :
                            finalScore.finalScore >= 20 ? 'text-orange-500' :
                            'text-red-500'
                        }`}>{finalScore.finalScore.toFixed(2)}/100</span>
                    </h3>
                    <p className="text-sm text-gray-500">
                        O score de investimento é uma medida que avalia a saúde financeira e o potencial de crescimento de uma empresa. Ele é calculado com base em vários indicadores financeiros, como margem de lucro, crescimento de receita, ROE, entre outros.
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
        </Card>
    );
} 