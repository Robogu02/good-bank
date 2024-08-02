const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api', (req, res) => {
    console.log('Received request body:', req.body);

    fetch('https://hooks.zapier.com/hooks/catch/1888053/bgwofce/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received response from Zapier:', data);
        res.json(data);
    })
    .catch(error => {
        console.error('Error fetching from Zapier:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
    console.log(`CORS proxy server listening at http://localhost:${port}`);
});