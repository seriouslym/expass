const expass = require('./core/expass')

const app = expass();
app.get("/hello", (req, res) => {
    res.json({
        name: "zjj",
        age: 23
    })
})
app.get("/", (req, res) => {
    res.html("<h1 style='color: aqua'>sfsfsfsf</h1>")
})
app.addRouter("GET", "/hello/:name/sd", (req, res) => {
    console.log(req["params"])
    let params = req["params"]
    res.text(`查询到params${JSON.stringify(params)}`)
})
app.listen(3000, () => {
    console.log("server listening on port 3000")
})

