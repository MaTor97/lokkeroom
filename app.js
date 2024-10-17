const express = require('express')
const app = express()
const PORT = 4500

app.get()
app.listen(PORT, (err)=>{
    if (err) throw err
    console.log(`Server listening on http://localhost:${PORT}`);
})