import express from 'express'

const app = express();

const PORT = 8000;

// to get something on localhost:8000

app.get('/', (req, res) => {
    // res.send('Server is running!')
    res.send({msg: 'server is running!'})
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})