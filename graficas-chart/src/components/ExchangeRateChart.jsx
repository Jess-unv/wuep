import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Importar Chart desde Chart.js

const ExchangeRateChart = ({ exchangeRateData }) => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartRef && chartRef.current && exchangeRateData) {
            if (chartInstance) {
                chartInstance.data.labels = exchangeRateData.labels;
                chartInstance.data.datasets[0].data = exchangeRateData.exchangeRate;
                chartInstance.update(); // Actualizar el gráfico existente
            } else {
                const newChartInstance = new Chart(chartRef.current.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: exchangeRateData.labels,
                        datasets: [{
                            label: 'Paridad Peso/Dólar',
                            data: exchangeRateData.exchangeRate,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        }],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Paridad peso/dolar.',
                            },
                        },
                    },
                });
                setChartInstance(newChartInstance); // Establecer la nueva instancia del gráfico
            }
        }
        
        // Limpieza: Devolver una función de limpieza para destruir el gráfico al desmontar
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [exchangeRateData]); // Dependencia de efecto: exchangeRateData

    return (
        <div className="chart">
            <canvas ref={chartRef} />
        </div>
    );
};

export default ExchangeRateChart;
