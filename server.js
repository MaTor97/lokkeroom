import express from 'express'
const PORT = 4500
const app =  express()

app.get('/', (req, res) => {
    res.send({
        info:`Hello World!`
    })
})


app.listen(PORT, () => console.log(`Server for lokkeroom started: http://localhost:${PORT}/`))