import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { useForecast } from '../contexts/ForecastContext';
import { Card } from "./ui/Card";

export function ForecastInputs() {
    const { indicators, updateIndicators } = useForecast();

    return (
        <Card className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
                <Label htmlFor="currentPrice">Preço Atual</Label>
                <Input
                    id="currentPrice"
                    type="number"
                    placeholder="Ex: 25.50"
                    value={indicators.currentPrice}
                    onChange={(e) => updateIndicators({ ...indicators, currentPrice: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="pe">P/L</Label>
                <Input
                    id="pe"
                    type="number"
                    placeholder="Ex: 12.5"
                    value={indicators.pe}
                    onChange={(e) => updateIndicators({ ...indicators, pe: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="eps">LPA</Label>
                <Input
                    id="eps"
                    type="number"
                    placeholder="Ex: 2.30"
                    value={indicators.eps}
                    onChange={(e) => updateIndicators({ ...indicators, eps: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="revenueCAGR">CAGR Receitas (%)</Label>
                <Input
                    id="revenueCAGR"
                    type="number"
                    placeholder="Ex: 15.8"
                    value={indicators.revenueCAGR}
                    onChange={(e) => updateIndicators({ ...indicators, revenueCAGR: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="profitCAGR">CAGR Lucros (%)</Label>
                <Input
                    id="profitCAGR"
                    type="number"
                    placeholder="Ex: 12.4"
                    value={indicators.profitCAGR}
                    onChange={(e) => updateIndicators({ ...indicators, profitCAGR: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="dividendYield">Dividend Yield (%)</Label>
                <Input
                    id="dividendYield"
                    type="number"
                    placeholder="Ex: 5.2"
                    value={indicators.dividendYield}
                    onChange={(e) => updateIndicators({ ...indicators, dividendYield: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="avgDividendYield5y">DY Médio 5 Anos (%)</Label>
                <Input
                    id="avgDividendYield5y"
                    type="number"
                    placeholder="Ex: 4.8"
                    value={indicators.avgDividendYield5y}
                    onChange={(e) => updateIndicators({ ...indicators, avgDividendYield5y: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="ebitdaMargin">Margem EBITDA (%)</Label>
                <Input
                    id="ebitdaMargin"
                    type="number"
                    placeholder="Ex: 28.5"
                    value={indicators.ebitdaMargin}
                    onChange={(e) => updateIndicators({ ...indicators, ebitdaMargin: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="roe">ROE (%)</Label>
                <Input
                    id="roe"
                    type="number"
                    placeholder="Ex: 15.3"
                    value={indicators.roe}
                    onChange={(e) => updateIndicators({ ...indicators, roe: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bvps">VPA</Label>
                <Input
                    id="bvps"
                    type="number"
                    placeholder="Ex: 18.75"
                    value={indicators.bvps}
                    onChange={(e) => updateIndicators({ ...indicators, bvps: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="vpa">VPA</Label>
                <Input
                    id="vpa"
                    type="number"
                    placeholder="Ex: 18.75"
                    value={indicators.vpa}
                    onChange={(e) => updateIndicators({ ...indicators, vpa: Number(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="priceVariation">Variação Preço (%)</Label>
                <Input
                    id="priceVariation"
                    type="number"
                    placeholder="Ex: 10.23"
                    value={indicators.priceVariation}
                    onChange={(e) => updateIndicators({ ...indicators, priceVariation: Number(e.target.value) })}
                />
            </div>
        </Card>
    );
} 