import React, { useState, useEffect, useRef } from 'react';
import ExchangeRateChart from './components/ExchangeRateChart';
import StockIndicatorsChart from './components/StockIndicatorsChart';
import MarketComparisonChart from './components/MarketComparisonChart';
import Chart from 'chart.js/auto'; // Importar Chart desde Chart.js
import './App.css'; // Archivo CSS para los estilos personalizados

const App = () => {
    const [exchangeRateData, setExchangeRateData] = useState(null);
    const [stockIndicatorsData, setStockIndicatorsData] = useState(null);
    const [marketComparisonData, setMarketComparisonData] = useState(null);
    const chartRefs = {
        exchangeRate: useRef(null),
        stockIndicators: useRef(null),
        marketComparison: useRef(null),
    };
    const chartInstances = {
        exchangeRate: useRef(null),
        stockIndicators: useRef(null),
        marketComparison: useRef(null),
    };

    useEffect(() => {
        const fetchExchangeRateData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/exchange-rate');
                const json = await response.json();
                if (json.data) {
                    setExchangeRateData({
                        labels: json.data.map(item => new Date(item.date)),
                        exchangeRate: json.data.map(item => item.exchange_rate),
                    });
                } else {
                    console.error('Datos de paridad peso/dólar vacíos o no válidos:', json);
                }
            } catch (error) {
                console.error("Error al obtener datos de paridad peso/dólar:", error);
            }
        };

        const fetchStockIndicatorsData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/stock-indicators');
                const json = await response.json();
                if (json.data) {
                    setStockIndicatorsData({
                        indicators: json.data.map(item => item.indicator),
                        values: json.data.map(item => item.value),
                    });
                } else {
                    console.error('Datos de indicadores de bolsa vacíos o no válidos:', json);
                }
            } catch (error) {
                console.error("Error al obtener datos de indicadores de bolsa:", error);
            }
        };

        const fetchMarketComparisonData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/market-comparison');
                const json = await response.json();
                if (json.data) {
                    setMarketComparisonData({
                        bmv: json.data.bmv,
                        usa: json.data.usa,
                    });
                } else {
                    console.error('Datos de comparación de mercados vacíos o no válidos:', json);
                }
            } catch (error) {
                console.error("Error al obtener datos de comparación de mercados:", error);
            }
        };

        fetchExchangeRateData();
        fetchStockIndicatorsData();
        fetchMarketComparisonData();
    }, []);

    

    useEffect(() => {
        if (exchangeRateData && chartRefs.exchangeRate.current) {
            if (chartInstances.exchangeRate.current) {
                chartInstances.exchangeRate.current.data.labels = exchangeRateData.labels;
                chartInstances.exchangeRate.current.data.datasets[0].data = exchangeRateData.exchangeRate;
                chartInstances.exchangeRate.current.update(); // Actualizar el gráfico existente
            } else {
                chartInstances.exchangeRate.current = new Chart(chartRefs.exchangeRate.current.getContext('2d'), {
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
                                text: 'Gráfico de Paridad Peso/Dólar',
                            },
                        },
                    },
                });
            }
        }

        // Limpieza: Devolver una función de limpieza para destruir el gráfico al desmontar
        return () => {
            if (chartInstances.exchangeRate.current) {
                chartInstances.exchangeRate.current.destroy();
                chartInstances.exchangeRate.current = null;
            }
        };
    }, [exchangeRateData]);

    useEffect(() => {
        if (stockIndicatorsData && chartRefs.stockIndicators.current) {
            if (chartInstances.stockIndicators.current) {
                chartInstances.stockIndicators.current.data.labels = stockIndicatorsData.indicators;
                chartInstances.stockIndicators.current.data.datasets[0].data = stockIndicatorsData.values;
                chartInstances.stockIndicators.current.update(); // Actualizar el gráfico existente
            } else {
                chartInstances.stockIndicators.current = new Chart(chartRefs.stockIndicators.current.getContext('2d'), {
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
            if (chartInstances.stockIndicators.current) {
                chartInstances.stockIndicators.current.destroy();
                chartInstances.stockIndicators.current = null;
            }
        };
    }, [stockIndicatorsData]);

    useEffect(() => {
        if (marketComparisonData && chartRefs.marketComparison.current) {
            if (chartInstances.marketComparison.current) {
                chartInstances.marketComparison.current.data.datasets[0].data = [
                    marketComparisonData.bmv[marketComparisonData.bmv.length - 1],
                    marketComparisonData.usa[marketComparisonData.usa.length - 1]
                ];
                chartInstances.marketComparison.current.update(); // Actualizar el gráfico existente
            } else {
                chartInstances.marketComparison.current = new Chart(chartRefs.marketComparison.current.getContext('2d'), {
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
            if (chartInstances.marketComparison.current) {
                chartInstances.marketComparison.current.destroy();
                chartInstances.marketComparison.current = null;
            }
        };
    }, [marketComparisonData]);

    return (
        <div className="app">
            <h1>Aplicación de Gráficos</h1>
            {exchangeRateData && stockIndicatorsData && marketComparisonData ? (
                <>
                    <div className="chart">
                        <h2>Paridad Peso/Dolar</h2>
                        <canvas ref={chartRefs.exchangeRate} />
                    </div>
                    <div className="chart">
                        <StockIndicatorsChart stockIndicatorsData={stockIndicatorsData} />
                    </div>
                    <div className="chart">
                        <MarketComparisonChart marketComparisonData={marketComparisonData} />
                    </div>
                </>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default App;
