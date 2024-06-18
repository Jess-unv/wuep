const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

// Endpoint for Exchange Rate Data
app.get('/api/exchange-rate', (req, res) => {
    const data = [
        { date: '2023-01-01', exchange_rate: 20.5, currency: 'MXN/USD' },
        { date: '2023-02-01', exchange_rate: 21.0, currency: 'MXN/USD' },
        { date: '2023-03-01', exchange_rate: 19.8, currency: 'MXN/USD' },
        // More data points
        { date: '2023-04-01', exchange_rate: 20.2, currency: 'MXN/USD' },
        { date: '2023-05-01', exchange_rate: 20.7, currency: 'MXN/USD' },
        { date: '2023-06-01', exchange_rate: 20.9, currency: 'MXN/USD' },
        // Add data for different currency pairs if needed
    ];
    res.json({ data });
});

// Endpoint for Stock Indicators Data
app.get('/api/stock-indicators', (req, res) => {
    const data = [
        { indicator: 'S&P 500', value: 3800, date: '2023-01-01' },
        { indicator: 'NASDAQ', value: 13000, date: '2023-01-01' },
        { indicator: 'DOW JONES', value: 34000, date: '2023-01-01' },
        
    ];
    res.json({ data });
});

// Endpoint for Market Comparison Data
app.get('/api/market-comparison', (req, res) => {
    const data = {
        dates: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01'],
        bmv: [45000, 46000, 47000, 48000, 49000, 50000],
        usa: [34000, 35000, 36000, 37000, 38000, 39000],
        dax: [15000, 15200, 15400, 15600, 15800, 16000],
        nikkei: [29000, 29500, 30000, 30500, 31000, 31500]
    };
    res.json({ data });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
