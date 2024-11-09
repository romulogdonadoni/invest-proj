import { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card } from './ui/Card'
import { Label } from './ui/Label'

function BazinValuation() {
  const [dyMedio, setDyMedio] = useState('')
  const [dividendoAnual, setDividendoAnual] = useState('')
  const [taxaDesejada, setTaxaDesejada] = useState('')
  const [precoJusto, setPrecoJusto] = useState(0)
  const [margemSeguranca, setMargemSeguranca] = useState(0)

  const calcularBazin = () => {
    // Converte os valores string para números
    const dyMedioNum = parseFloat(dyMedio) || 0;
    const dividendoAnualNum = parseFloat(dividendoAnual) || 0;
    const taxaDesejadaNum = parseFloat(taxaDesejada) || 0;

    // Calcula o preço justo (Dividendo Anual / Taxa Desejada)
    const precoJustoCalculado = dividendoAnualNum / (taxaDesejadaNum / 100);

    // Calcula a margem de segurança ((DY Médio - Taxa Desejada) / DY Médio * 100)
    const margemSegurancaCalculada = ((dyMedioNum - taxaDesejadaNum) / dyMedioNum) * 100;

    // Atualiza os estados
    setPrecoJusto(precoJustoCalculado);
    setMargemSeguranca(margemSegurancaCalculada);
  }

  return (
    <Card className="flex flex-col flex-1 h-full bg-white rounded-xl shadow-md p-6 mb-8 col-span-1">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Valuation Bazin</h2>
      <div className="mb-4">
        <Label htmlFor="dyMedio" className="block text-gray-700 mb-2">DY Médio (%)</Label>
        <Input
          type="number"
          id="dyMedio"
          value={dyMedio}
          onChange={(e) => setDyMedio(e.target.value)}
          placeholder="5.33"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="dividendoAnual" className="block text-gray-700 mb-2">Div. Médio Anual (R$)</Label>
        <Input
          type="number"
          id="dividendoAnual"
          value={dividendoAnual}
          onChange={(e) => setDividendoAnual(e.target.value)}
          placeholder="0.66"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="taxaDesejada" className="block text-gray-700 mb-2">Taxa Desejada (%)</Label>
        <Input
          type="number"
          id="taxaDesejada"
          value={taxaDesejada}
          onChange={(e) => setTaxaDesejada(e.target.value)}
          placeholder="6.0"
          step="0.1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button
        variant="default"
        onClick={calcularBazin}
      >
        Calcular
      </Button>
      <div className="mt-auto">
        <h3 className="text-lg font-semibold text-gray-800">Preço Justo: R$ {precoJusto.toFixed(2)}</h3>
        <h3 className="text-lg font-semibold text-gray-800">Margem de Segurança: {margemSeguranca}%</h3>
      </div>
    </Card>
  )
}

export default BazinValuation