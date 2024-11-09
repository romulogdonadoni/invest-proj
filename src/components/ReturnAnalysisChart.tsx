import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function ReturnAnalysisChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const historicalData = {
    nominal: {
      labels: ['-10 anos', '-5 anos', '-2 anos', '-1 ano', '-3 meses', '-1 mês'],
      values: [262.58, 56.24, 69.89, 11.53, -0.50, -0.65]
    },
    real: {
      values: [107.58, 16.79, 55.35, 6.76, -1.49, -0.65]
    }
  };

  const futureLabels = ['1 mês', '3 meses', '1 ano', '2 anos', '5 anos', '10 anos'];

  const calculateProjection = () => {
    const realReturns = historicalData.real.values;
    const avgReturn = realReturns.reduce((a, b) => a + b, 0) / realReturns.length;

    return futureLabels.map((_, index) => avgReturn + (index * 5));
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const projectedReturns = calculateProjection();

    // Destruir gráfico antigo se existir para evitar duplicação
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [...historicalData.nominal.labels, ...futureLabels],
        datasets: [
          {
            label: 'Rentabilidade Nominal',
            data: [...historicalData.nominal.values, ...Array(futureLabels.length).fill(null)],
            backgroundColor: '#8884d8',
            order: 2
          },
          {
            label: 'Rentabilidade Real',
            data: [...historicalData.real.values, ...Array(futureLabels.length).fill(null)],
            backgroundColor: '#82ca9d',
            order: 1
          },
          {
            label: 'Projeção',
            data: [...Array(historicalData.nominal.labels.length).fill(null), ...projectedReturns],
            type: 'line',
            borderColor: '#ff7300',
            borderDash: [5, 5],
            fill: false,
            order: 0
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Rentabilidade (%)'
            }
          },
          x: {
            grid: {
              display: true,
              color: (context) => context.index === 5 ? '#666' : '#eee',
              lineWidth: (context) => context.index === 5 ? 2 : 1,
            },
            title: {
              display: true,
              text: 'Período'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                if (context.parsed.y !== null) {
                  return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                }
                return '';
              }
            }
          },
          legend: {
            position: 'top',
          }
        }
      }
    });
    
    // Cleanup ao desmontar o componente
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-center mb-4">
        Análise de Rentabilidade Histórica e Projeção
      </h2>
      <canvas ref={chartRef} />
    </div>
  );
}
