import { useState } from 'react'
import { Card } from './ui/Card'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import { Button } from './ui/Button'

function PeterLynchValuation() {
  const [dy, setDy] = useState('')
  const [crescimento, setCrescimento] = useState('')
  const [precoJusto, setPrecoJusto] = useState(0)

  const calcularPrecoJusto = () => {
    const dyNumerico = parseFloat(dy) || 0;
    const crescimentoNumerico = parseFloat(crescimento) || 0;

    // Fórmula de Peter Lynch: (DY + Crescimento) * 100 / 15
    const resultado = ((dyNumerico + crescimentoNumerico) * 100) / 15;
    setPrecoJusto(resultado);
  }

  return (
    <Card className="flex flex-col flex-1 h-full bg-white rounded-xl shadow-md p-6 col-span-1">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Valuation Peter Lynch</h2>
      <div className="mb-4">
        <Label htmlFor="dy" className="block text-gray-700 mb-2">Dividend Yield (%)</Label>
        <Input
          type="number"
          id="dy"
          value={dy}
          onChange={(e) => setDy(e.target.value)}
          placeholder="9.58"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="crescimento" className="block text-gray-700 mb-2">Crescimento Projetivo (%)</Label>
        <Input
          type="number"
          id="crescimento"
          value={crescimento}
          onChange={(e) => setCrescimento(e.target.value)}
          placeholder="3.00"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button
        variant="default"
        onClick={calcularPrecoJusto}
      >
        Calcular
      </Button>
      <div className="mt-auto">
        <h3 className="text-lg font-semibold text-gray-800">Preço Justo: R$ {precoJusto.toFixed(2)}</h3>
      </div>
    </Card>
  )
}

export default PeterLynchValuation