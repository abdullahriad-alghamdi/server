// Initialize express
const express = require('express');
const app = express();
const port = 3000;


const foodProducts= [
    {
        name: 'Pizza',
        type: 'Italian',
        price: 10
    },
    {
        name: 'Hamburger',
        type: 'American',
        price: 5
    },
    {
        name: 'Sushi',
        type: 'Japanese',
        price: 20
    }
];



app.get('/', (req, res) =>  res.send(foodProducts));





app.listen(port, () => console.log(`App listening on port http://localhost:${port}`));