import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Importar Chart desde Chart.js

const MarketComparisonChart = ({ marketComparisonData }) => {
    const chartRef = useRef(null);
    let chartInstance = useRef(null); // Usar useRef para mantener una referencia al objeto Chart

    useEffect(() => {
        if (chartRef.current && marketComparisonData) {
            if (chartInstance.current) {
                chartInstance.current.data.labels = ['BMV', 'USA'];
                chartInstance.current.data.datasets[0].data = [
                    marketComparisonData.bmv[marketComparisonData.bmv.length - 1],
                    marketComparisonData.usa[marketComparisonData.usa.length - 1]
                ];
                chartInstance.current.update(); // Actualizar el gráfico existente
            } else {
                chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['BMV', 'USA'],
                        datasets: [{
                            label: 'Market Comparison',
                            data: [
                                marketComparisonData.bmv[marketComparisonData.bmv.length - 1],
                                marketComparisonData.usa[marketComparisonData.usa.length - 1]
                            ],
                            backgroundColor: ['#FF6384', '#36A2EB'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                        }],
                    },
                    options: {
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                            title: {
                                display: true,
                                text: 'Market Comparison Chart',
                            },
                        },
                    },
                });
            }
        }

        // Limpieza: Devolver una función de limpieza para destruir el gráfico al desmontar
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [marketComparisonData]); // Dependencia de efecto: marketComparisonData

    return (
        <div>
            <h2>Comparativa BMV y NYSE.</h2>
            <div className="chart">
                <canvas ref={chartRef} />
            </div>
        </div>
    );
};

export default MarketComparisonChart;
