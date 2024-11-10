"use client";

import { useEffect, useState } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { StockIndicators } from '../types/indicators';
import { calculateInvestmentScore } from '../utils/investmentAnalysis';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { CompanySector } from '../types/sectors';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import AnalysisGenerative from './AnalysisGenerative';
import webScrap from '../utils/webScrap';


export default function InvestmentAnalysisChart() {

    const [sector, setSector] = useState<CompanySector>(CompanySector.TECHNOLOGY);

    const [webScrapData, setWebScrapData] = useState<StockIndicators>({
        price: 0,
        priceVariation12m: 0,
        pe: 0,
        pbv: 0,
        dividendYield: 0,
        profitMargin: 0,
        roe: 0,
        debtToEquity: 0
    });

    const [ticker, setTicker] = useState<string>('');

    const getWebScrapData = async () => {
        const data = await webScrap(ticker);
        setWebScrapData(data);
        console.log(data);
    }

    const finalScore = calculateInvestmentScore(webScrapData, sector);

    const chartData = [
        { subject: 'ROE', score: webScrapData?.roe },
        { subject: 'Dividend Yield', score: webScrapData?.dividendYield },
        { subject: 'P/L', score: webScrapData?.pe },
        { subject: 'P/VP', score: webScrapData?.pbv },
        { subject: 'Margem de Lucro', score: webScrapData?.profitMargin },
        { subject: 'Dívida/Patrimônio', score: webScrapData?.debtToEquity },
    ];

    const prompt = `Como analista financeiro, faça uma análise detalhada do investimento no setor ${sector} considerando os seguintes indicadores:

- P/L (Preço/Lucro): ${webScrapData.pe}
- P/VP (Preço/Valor Patrimonial): ${webScrapData.pbv}
- ROE (Retorno sobre Patrimônio): ${webScrapData.roe}%
- Dividend Yield: ${webScrapData.dividendYield}%
- Margem de Lucro: ${webScrapData.profitMargin}%
- Dívida/Patrimônio: ${webScrapData.debtToEquity}%

Por favor, forneça:
1. Uma avaliação geral da saúde financeira da empresa
2. Comparação destes indicadores com a média do setor ${sector}
3. Principais pontos fortes e fracos identificados
4. Uma nota de 0 a 100 para este investimento, justificando a pontuação
5. Recomendação final (Comprar, Manter ou Vender)`;

    useEffect(() => {
        getWebScrapData();
    }, [ticker]);

    return (
        <Card>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                    <Label>Ticker</Label>
                    <Input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Setor</Label>
                    <Select value={sector} onValueChange={(value: string) => setSector(value as CompanySector)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um setor" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(CompanySector).map((sector) => (
                                <SelectItem key={sector} value={sector}>
                                    {sector}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>P/L (x)</Label>
                    <Input
                        type="number"
                        value={webScrapData.pe}
                        onChange={(e) => setWebScrapData({ ...webScrapData, pe: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>P/VP (x)</Label>
                    <Input
                        type="number"
                        value={webScrapData.pbv}
                        onChange={(e) => setWebScrapData({ ...webScrapData, pbv: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>ROE (%)</Label>
                    <Input
                        type="number"
                        value={webScrapData.roe}
                        onChange={(e) => setWebScrapData({ ...webScrapData, roe: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Dividend Yield (%)</Label>
                    <Input
                        type="number"
                        value={webScrapData.dividendYield}
                        onChange={(e) => setWebScrapData({ ...webScrapData, dividendYield: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Margem de Lucro (%)</Label>
                    <Input
                        type="number"
                        value={webScrapData.profitMargin}
                        onChange={(e) => setWebScrapData({ ...webScrapData, profitMargin: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Dívida/Patrimônio (%)</Label>
                    <Input
                        type="number"
                        value={webScrapData.debtToEquity}
                        onChange={(e) => setWebScrapData({ ...webScrapData, debtToEquity: parseFloat(e.target.value) })}
                    />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold">
                        Score de Investimento:
                        <span className={`${finalScore.finalScore >= 80 ? 'text-emerald-500' :
                            finalScore.finalScore >= 60 ? 'text-green-500' :
                                finalScore.finalScore >= 40 ? 'text-yellow-500' :
                                    finalScore.finalScore >= 20 ? 'text-orange-500' :
                                        'text-red-500'
                            }`}>{finalScore.finalScore.toFixed(2)}/100
                        </span>
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

            <AnalysisGenerative prompt={prompt} />
        </Card>
    );
} 