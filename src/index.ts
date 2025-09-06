import express from "express";
const app = express();

const port = process.env.PORT ?? "9001"

app.get("/", (req,res) => {
    res.send("Hello from budget control app")
    console.log("Response sent by server")
})

app.listen(port, () =>{
    console.log(`Application initialized on port ${port}`)
})