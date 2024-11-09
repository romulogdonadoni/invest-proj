import BazinValuation from "./components/BazinValuation"
import ForecastChart from "./components/ForecastChart"
import { ForecastInputs } from "./components/ForecastInputs"
import InvestmentAnalysisChart from "./components/InvestmentAnalysisChart"
import PeterLynchValuation from "./components/PeterLynchValuation"
import { ForecastProvider } from "./contexts/ForecastContext"

function App() {
  return (
    <ForecastProvider>
      <div className="bg-gray-100 min-h-screen min-w-screen p-8">
        <main className="flex flex-1 flex-col mx-[20%]">
          <div className="grid grid-cols-2 gap-3 justify-center">
            <BazinValuation />
            <PeterLynchValuation />
          </div>
          <div className="mt-8 space-y-8">
            <ForecastInputs />
            <ForecastChart />
            <InvestmentAnalysisChart />
            
          </div>
        </main>
      </div>
    </ForecastProvider>
  )
}

export default App