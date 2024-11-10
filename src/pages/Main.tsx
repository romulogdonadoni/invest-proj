import { ForecastProvider } from "../contexts/ForecastContext";
import { ForecastInputs } from "../components/ForecastInputs";
import ForecastChart from "../components/ForecastChart";
import InvestmentAnalysisChart from "../components/InvestmentAnalysisChart";

export default function Main() {
    return (
        <ForecastProvider>
            <div className="space-y-8">
                <ForecastInputs />
                <ForecastChart />
                <InvestmentAnalysisChart />
            </div>
        </ForecastProvider>
    );
}
