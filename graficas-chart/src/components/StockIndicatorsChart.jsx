import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Importar Chart desde Chart.js

const StockIndicatorsChart = ({ stockIndicatorsData }) => {
    const chartRef = useRef(null);
    let chartInstance = useRef(null); // Usar useRef para mantener una referencia al objeto Chart

    useEffect(() => {
        if (chartRef.current && stockIndicatorsData) {
            if (chartInstance.current) {
                chartInstance.current.data.labels = stockIndicatorsData.indicators;
                chartInstance.current.data.datasets[0].data = stockIndicatorsData.values;
                chartInstance.current.update(); // Actualizar el gráfico existente
            } else {
                chartInstance.current = new Chart(chartRef.current.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: stockIndicatorsData.indicators,
                        datasets: [{
                            label: 'Stock Indicators',
                            data: stockIndicatorsData.values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        indexAxis: 'y',
                        elements: {
                            bar: {
                                borderWidth: 2,
                            },
                        },
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'right',
                            },
                            title: {
                                display: true,
                                text: 'Stock Indicators Chart',
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
    }, [stockIndicatorsData]); // Dependencia de efecto: stockIndicatorsData

    return (
        <div>
            <h2>Indicadores de  la  bolsa  de  valores.</h2>
            <div className="chart">
                <canvas ref={chartRef} />
            </div>
        </div>
    );
};

export default StockIndicatorsChart;
